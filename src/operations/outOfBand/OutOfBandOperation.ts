/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import type { OutOfBandAuthentication } from './OutOfBandAuthentication';
import { OutOfBandAuthenticationImpl } from './OutOfBandAuthentication';
import type { OutOfBandPayload } from './OutOfBandPayload';
import { OutOfBandRegistration, OutOfBandRegistrationImpl } from './OutOfBandRegistration';
import {
	OutOfBandPlatformOperation,
	OutOfBandPlatformOperationType,
} from '../../cache/operation/OutOfBandPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { OutOfBandOperationError } from '../../error/outOfBand/operation/OutOfBandOperationError';
import { OutOfBandOperationErrorConverter } from '../../error/outOfBand/operation/OutOfBandOperationErrorConverter';
import { OutOfBandOperationUnknownError } from '../../error/outOfBand/operation/OutOfBandOperationUnknownError';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OutOfBandOperationMessage } from '../../model/messages/out/OutOfBandOperationMessage';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';

/**
 * The operation managing an {@link OutOfBandPayload}.
 *
 * An {@link OutOfBandPayload} can be provided through different means:
 *   - a push notification,
 *   - a QR code or
 *   - an application link.
 *
 * This operation will process the payload, decrypt it if needed and send it to the server. If the
 * payload is successfully handled by the server, then the SDK will identify whether the operation
 * associated with the payload is a registration or an authentication. Depending on that the
 * {@link onRegistration} or the {@link onAuthentication} will be invoked.
 *
 * Usage example:
 * ```ts
 * [...]
 *   async authenticateUsingOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *       await client.operations.outOfBandOperation
 *           .payload(payload)
 *           .onRegistration((registration) => {
 *               // handle registration
 *           })
 *           .onAuthentication((authentication) => {
 *               // handle authentication
 *           })
 *           .onError((_error) => {
 *               // handle out-of-band error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * @see
 * - {@link OutOfBandPayload}
 * - {@link OutOfBandRegistration}
 * - {@link OutOfBandAuthentication}
 */
export abstract class OutOfBandOperation extends HttpOperation<OutOfBandOperation> {
	/**
	 * Specifies the out-of-band payload to be handled.
	 *
	 * **IMPORTANT** \
	 * Providing the out-of-band payload is required.
	 *
	 * @param payload the payload.
	 * @returns an {@link OutOfBandOperation} object.
	 */
	abstract payload(payload: OutOfBandPayload): OutOfBandOperation;

	/**
	 * Specifies the object that will handle the {@link OutOfBandRegistration} object associated with
	 * the out-of-band payload.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link onRegistration} or {@link onAuthentication} callbacks is
	 * required.
	 *
	 * @param onRegistration the callback that will be invoked in case of registration.
	 * @returns an {@link OutOfBandOperation} object.
	 */
	abstract onRegistration(
		onRegistration: (registration: OutOfBandRegistration) => void
	): OutOfBandOperation;

	/**
	 * Specifies the object that will handle the {@link OutOfBandAuthentication} object associated with
	 * the out-of-band payload.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link onRegistration} or {@link onAuthentication} callbacks is
	 * required.
	 *
	 * @param onAuthentication the callback that will be invoked in case of authentication.
	 * @returns an {@link OutOfBandOperation} object.
	 */
	abstract onAuthentication(
		onAuthentication: (authentication: OutOfBandAuthentication) => void
	): OutOfBandOperation;

	/**
	 * Specifies the object that will be invoked if the {@link OutOfBandPayload} could not be decoded.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the callback which receives an {@link OutOfBandPayloadError}.
	 * @returns an {@link OutOfBandPayloadDecode} object.
	 */
	abstract onError(onError: (error: OutOfBandOperationError) => void): OutOfBandOperation;
}

export class OutOfBandOperationImpl
	extends HttpOperationImpl<OutOfBandOperation>
	implements OutOfBandOperation
{
	private _payload?: OutOfBandPayload;
	private _onRegistration?: (registration: OutOfBandRegistration) => void;
	private _onAuthentication?: (authentication: OutOfBandAuthentication) => void;
	private _onError?: (error: OutOfBandOperationError) => void;

	payload(payload: OutOfBandPayload): OutOfBandOperation {
		this._payload = payload;
		return this;
	}

	onRegistration(
		onRegistration: (registration: OutOfBandRegistration) => void
	): OutOfBandOperation {
		this._onRegistration = onRegistration;
		return this;
	}

	onAuthentication(
		onAuthentication: (authentication: OutOfBandAuthentication) => void
	): OutOfBandOperation {
		this._onAuthentication = onAuthentication;
		return this;
	}

	onError(onError: (error: OutOfBandOperationError) => void): OutOfBandOperation {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const subOperationId = uuid.v4() as string;

		const onOperationType = (type: OutOfBandPlatformOperationType) => {
			switch (type) {
				case OutOfBandPlatformOperationType.registration: {
					const registration = new OutOfBandRegistrationImpl(subOperationId);
					this._onRegistration?.(registration);
					break;
				}
				case OutOfBandPlatformOperationType.authentication: {
					const authentication = new OutOfBandAuthenticationImpl(subOperationId);
					this._onAuthentication?.(authentication);
					break;
				}
				default:
					this._onError?.(
						new OutOfBandOperationUnknownError(
							`Unsupported out-of-band operation type (${type}).`
						)
					);
			}
		};

		const operation = new OutOfBandPlatformOperation(operationId, onOperationType);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new OutOfBandOperationMessage(
			operationId,
			subOperationId,
			false,
			this.onError !== undefined,
			this.httpRequestHeaders,
			this._payload,
			this._onRegistration !== undefined,
			this._onAuthentication !== undefined
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.oobOperation(message)
			.then(() => finish())
			.catch((error: Error) => {
				finish();
				const operationError = new OutOfBandOperationErrorConverter(error).convert();
				this._onError?.(operationError);
			});
	}
}
