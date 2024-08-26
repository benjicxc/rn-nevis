/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import type { AuthorizationProvider } from '../authorization/AuthorizationProvider';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { OperationError } from '../error/operation/OperationError';
import { OperationErrorConverter } from '../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { DeregistrationMessage } from '../model/messages/out/DeregistrationMessage';

/**
 * The object that can be used to trigger a deregistration operation.
 *
 * Usage example:
 * ```ts
 *   [...]
 *   async deregister(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       aaid: string
 *   ): Promise<void> {
 *       await client.operations.deregistration
 *           .username(username)
 *           .aaid(aaid)
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *   }
 *   [...]
 * ```
 */
export abstract class Deregistration extends HttpOperation<Deregistration> {
	/**
	 * Specifies the username that must be deregistered.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link username} is required.
	 *
	 * @param username the username.
	 * @returns a {@link Deregistration} object.
	 */
	abstract username(username: string): Deregistration;

	/**
	 * Specifies the AAID of the {@link Authenticator} that must be deregistered.
	 *
	 * **NOTE** \
	 * If no AAID is provided then all authenticators will be deregistered.

	 * @param aaid the AAID of the authenticator to be deregistered.
	 * @returns a {@link Deregistration} object.
	 */
	abstract aaid(aaid: string): Deregistration;

	/**
	 * Specifies the {@link AuthorizationProvider} provider to be used to deregister the authenticator.
	 *
	 * **NOTE** \
	 * This doesn't have to be provided on Authentication Cloud environment.
	 *
	 * @param authorizationProvider {@link AuthorizationProvider}.
	 * @returns a {@link Deregistration} object.
	 */
	abstract authorizationProvider(authorizationProvider: AuthorizationProvider): Deregistration;

	/**
	 * Specifies the object that will be invoked if the authenticator was deleted
	 * successfully.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the function which is invoked on successful deregistration.
	 * @returns a {@link Deregistration} object.
	 */
	abstract onSuccess(onSuccess: () => void): Deregistration;

	/**
	 * Specifies the object that will be invoked if the deregistration failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the function which receives an {@link OperationError}.
	 * @returns a {@link Deregistration} object.
	 */
	abstract onError(onError: (error: OperationError) => void): Deregistration;
}

export class DeregistrationImpl
	extends HttpOperationImpl<Deregistration>
	implements Deregistration
{
	private _username?: string;
	private _aaid?: string;
	private _authorizationProvider?: AuthorizationProvider;
	private _onSuccess?: () => void;
	private _onError?: (error: OperationError) => void;
	aaid(aaid: string): Deregistration {
		this._aaid = aaid;
		return this;
	}

	username(username: string): Deregistration {
		this._username = username;
		return this;
	}

	authorizationProvider(authorizationProvider: AuthorizationProvider): Deregistration {
		this._authorizationProvider = authorizationProvider;
		return this;
	}

	onError(onError: (error: OperationError) => void): Deregistration {
		this._onError = onError;
		return this;
	}

	onSuccess(onSuccess: () => void): Deregistration {
		this._onSuccess = onSuccess;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const operation = new UserInteractionPlatformOperationImpl(operationId);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new DeregistrationMessage(
			operationId,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this.httpRequestHeaders,
			this._authorizationProvider,
			this._username,
			this._aaid
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.deregister(message)
			.then((): void => {
				finish();
				this._onSuccess?.();
			})
			.catch((error: any) => {
				finish();
				const operationError = new OperationErrorConverter(error).convert();
				this._onError?.(operationError);
			});
	}
}
