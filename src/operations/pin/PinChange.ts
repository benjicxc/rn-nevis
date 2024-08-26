/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import type { PinChanger } from './PinChanger';
import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import type { PinChangeError } from '../../error/pin/change/PinChangeError';
import { PinChangeErrorConverter } from '../../error/pin/change/PinChangeErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { PinChangeMessage } from '../../model/messages/out/PinChangeMessage';
import { Operation } from '../Operation';

/**
 * The object that can be used to change the PIN.
 *
 * Usage example:
 * ```ts
 * class PinChangerImpl implements PinChanger {
 *     async changePin(context: PinChangeContext, handler: PinChangeHandler) {
 *         handler.pins(oldPin, newPin);
 *     }
 * }
 *
 * [...]
 * async pinChange({
 *     client: MobileAuthenticationClient,
 *     username: string,
 * }): Promise<void> {
 *     await client.operations.pinChange
 *         .username(username)
 *         .pinChanger(PinChangerImpl(...))
 *         .onSuccess(() {
 *             // handle success
 *         })
 *         .onError((error) {
 *             // handle error
 *         })
 *         .execute();
 * }
 * [...]
 * ```
 */
export abstract class PinChange extends Operation {
	/**
	 * The username whose PIN must be changed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link username} is required.
	 *
	 * @param username the username.
	 * @returns a {@link PinChange} object.
	 */
	abstract username(username: string): PinChange;

	/**
	 * Specifies the object that will take care of changing the PIN of the specified
	 * username.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link pinChanger} is required.
	 *
	 * @param pinChanger the {@link pinChanger}
	 * @returns a {@link PinChange} object.
	 */
	abstract pinChanger(pinChanger: PinChanger): PinChange;

	/**
	 * Specifies the object that will be invoked if the PIN was successfully modified.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the callback which is invoked on successful PIN modification.
	 * @returns a {@link PinChange} object.
	 */
	abstract onSuccess(onSuccess: () => void): PinChange;

	/**
	 * Specifies the object that will be invoked when the PIN could not be changed:
	 * the PIN was not enrolled, the PIN is locked or the operation was canceled.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * Params:
	 *   - onError: the callback which receives a {@link PinChangeError}.
	 *
	 * @param onError
	 * @returns a {@link PinChange} object.
	 */
	abstract onError(onError: (error: PinChangeError) => void): PinChange;
}

export class PinChangeImpl extends PinChange {
	private _username?: string;
	private _pinChanger?: PinChanger;
	private _onSuccess?: () => void;
	private _onError?: (error: PinChangeError) => void;

	username(username: string): PinChange {
		this._username = username;
		return this;
	}

	pinChanger(pinChanger: PinChanger): PinChange {
		this._pinChanger = pinChanger;
		return this;
	}

	onSuccess(onSuccess: () => void): PinChange {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: PinChangeError) => void): PinChange {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const operation = new UserInteractionPlatformOperationImpl(
			operationId,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			this._pinChanger
		);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new PinChangeMessage(
			operationId,
			this._pinChanger !== undefined,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this._username,
			this._pinChanger?.pinPolicy
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.pinChange(message)
			.then(() => {
				finish();
				this._onSuccess?.();
			})
			.catch((error: any) => {
				finish();
				const pinChangeError = new PinChangeErrorConverter(error).convert();
				this._onError?.(pinChangeError);
			});
	}
}
