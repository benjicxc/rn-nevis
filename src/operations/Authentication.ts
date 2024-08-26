/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import type { RetryPolicy } from './RetryPolicy';
import { PinUserVerifier } from './userverification/PinUserVerifier';
import type { AuthorizationProvider } from '../authorization/AuthorizationProvider';
import type { SessionProvider } from '../authorization/SessionProvider';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { AuthenticationError } from '../error/authentication/AuthenticationError';
import { AuthenticationErrorConverter } from '../error/authentication/AuthenticationErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { OnSuccessMessage } from '../model/messages/in/OnSuccessMessage';
import { AuthenticationMessage } from '../model/messages/out/AuthenticationMessage';
import { AuthenticatorSelector } from '../operations/selection/AuthenticatorSelector';
import { BiometricUserVerifier } from '../operations/userverification/BiometricUserVerifier';
import { DevicePasscodeUserVerifier } from '../operations/userverification/DevicePasscodeUserVerifier';
import { FingerprintUserVerifier } from '../operations/userverification/FingerprintUserVerifier';

/**
 * The object that can be used to trigger an authentication operation.
 *
 * Usage example:
 * ```ts
 *  class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *      async selectAuthenticator(
 *          context: AuthenticatorSelectionContext,
 *          handler: AuthenticatorSelectionHandler,
 *      ): Promise<void> {
 *          await handler.aaid(aaid).catch(console.error);
 *      }
 *  }
 *
 *  class PinUserVerifierImpl extends PinUserVerifier {
 *      async verifyPin(
 *          context: PinUserVerificationContext,
 *          handler: PinUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyPin(pin).catch(console.error);
 *      }
 *  }
 *
 *  class BiometricUserVerifierImpl implements BiometricUserVerifier {
 *      async verifyBiometric(
 *          context: BiometricUserVerificationContext,
 *          handler: BiometricUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyBiometric().catch(console.error);
 *      }
 *  }
 *
 *  [...]
 *  async function authenticate(
 *      client: MobileAuthenticationClient,
 *      username: string,
 *      sessionProvider?: SessionProvider,
 *  ): Promise<void> {
 *      await client.operations.authentication
 *          .username(username)
 *          .sessionProvider(sessionProvider)
 *          .authenticatorSelector(AuthenticatorSelectorImpl(...))
 *          .pinUserVerifier(PinUserVerifierImpl(...))
 *          .biometricUserVerifier(BiometricUserVerifierImpl(...))
 *          .onSuccess((authorizationProvider) {
 *              // handle success
 *          })
 *          .onError((error) {
 *              // handle error
 *          })
 *          .execute();
 *  }
 *  [...]
 * ```
 */
export abstract class Authentication extends HttpOperation<Authentication> {
	/**
	 * Specifies the username that must be used to authenticate.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link username} is required.
	 *
	 * @param username the username.
	 * @returns the {@link Authentication} object.
	 */
	abstract username(username: string): Authentication;

	/**
	 * Specifies the session provider that must be used to authenticate.
	 *
	 * @param sessionProvider the {@link SessionProvider}.
	 * @returns the {@link Authentication} object.
	 */
	abstract sessionProvider(sessionProvider: SessionProvider): Authentication;

	/**
	 * The retry policy to be used to obtain an {@link AuthorizationProvider} after the
	 * user authenticates successfully. If obtaining an {@link AuthorizationProvider}
	 * fails on the first try, the SDK will retry according to the provided {@link RetryPolicy}.
	 * This policy is used when the backend is the Identity Suite and cookies are
	 * created after a successful authentication.
	 *
	 * @param retryPolicy the retry policy to be used when retrieving the {@link AuthorizationProvider}.
	 * By default, the code will retry 3 times with a time interval of 1 second
	 * between tries.
	 * @returns the {@link Authentication} object.
	 */
	abstract retryPolicyObtainingAuthorizationProvider(retryPolicy: RetryPolicy): Authentication;

	/**
	 * Specifies the object that will take care of the selection of the authenticator
	 * to be used.
	 *
	 * **IMPORTANT** \
	 * Providing the authenticator selector is required.
	 *
	 * @param authenticatorSelector the {@link AuthenticatorSelector}.
	 * @returns the {@link Authentication} object.
	 */
	abstract authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Authentication;

	/**
	 * Specifies the object that will take care of the PIN user verification.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinUserVerifier}, {@link BiometricUserVerifier} or
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param pinUserVerifier the {@link PinUserVerifier}.
	 * @returns the {@link Authentication} object.
	 */
	abstract pinUserVerifier(pinUserVerifier: PinUserVerifier): Authentication;

	/**
	 * Specifies the object that will take care of the biometric user verification.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinUserVerifier}, {@link BiometricUserVerifier} or
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param biometricUserVerifier the {@link BiometricUserVerifier}.
	 * @returns the {@link Authentication} object.
	 */
	abstract biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Authentication;

	/**
	 * Specifies the object that will take care of the device passcode user verification.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param devicePasscodeUserVerifier the {@link DevicePasscodeUserVerifier}.
	 * @returns the {@link Authentication} object.
	 */
	abstract devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): Authentication;

	/**
	 * Specifies the object that will take care of the fingerprint user verification.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param fingerprintUserVerifier the {@link FingerprintUserVerifier}.
	 * @returns the {@link Authentication} object.
	 */
	abstract fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): Authentication;

	/**
	 * Specifies the object that will be invoked if the authentication was successful.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the callback which receives an optional {@link AuthorizationProvider}.
	 * @returns the {@link Authentication} object.
	 */
	abstract onSuccess(
		onSuccess: (authorizationProvider?: AuthorizationProvider) => void
	): Authentication;

	/**
	 * Specifies the object that will be invoked if the authentication failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the function which receives an {@link AuthenticationError}.
	 * @returns the {@link Authentication} object.
	 */
	abstract onError(onError: (error: AuthenticationError) => void): Authentication;
}

export class AuthenticationImpl
	extends HttpOperationImpl<Authentication>
	implements Authentication
{
	private _username?: string;
	private _sessionProvider?: SessionProvider;
	private _retryPolicyObtainingAuthorizationProvider?: RetryPolicy;
	private _authenticatorSelector?: AuthenticatorSelector;
	private _pinUserVerifier?: PinUserVerifier;
	private _biometricUserVerifier?: BiometricUserVerifier;
	private _devicePasscodeUserVerifier?: DevicePasscodeUserVerifier;
	private _fingerprintUserVerifier?: FingerprintUserVerifier;
	private _onSuccess?: (authorizationProvider?: AuthorizationProvider) => void;
	private _onError?: (error: AuthenticationError) => void;

	username(username: string): Authentication {
		this._username = username;
		return this;
	}

	sessionProvider(sessionProvider: SessionProvider) {
		this._sessionProvider = sessionProvider;
		return this;
	}

	retryPolicyObtainingAuthorizationProvider(retryPolicy: RetryPolicy): Authentication {
		this._retryPolicyObtainingAuthorizationProvider = retryPolicy;
		return this;
	}

	authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Authentication {
		this._authenticatorSelector = authenticatorSelector;
		return this;
	}

	pinUserVerifier(pinUserVerifier: PinUserVerifier): Authentication {
		this._pinUserVerifier = pinUserVerifier;
		return this;
	}

	biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Authentication {
		this._biometricUserVerifier = biometricUserVerifier;
		return this;
	}

	devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): Authentication {
		this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
		return this;
	}

	fingerprintUserVerifier(fingerprintUserVerifier: FingerprintUserVerifier): Authentication {
		this._fingerprintUserVerifier = fingerprintUserVerifier;
		return this;
	}

	onSuccess(onSuccess: (authorizationProvider?: AuthorizationProvider) => void): Authentication {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: AuthenticationError) => void): Authentication {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const operation = new UserInteractionPlatformOperationImpl(
			operationId,
			this._authenticatorSelector,
			undefined,
			this._biometricUserVerifier,
			this._devicePasscodeUserVerifier,
			this._fingerprintUserVerifier,
			this._pinUserVerifier,
			undefined,
			undefined
		);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new AuthenticationMessage(
			operationId,
			this._authenticatorSelector !== undefined,
			this._pinUserVerifier !== undefined,
			this._biometricUserVerifier !== undefined,
			this._devicePasscodeUserVerifier !== undefined,
			this._fingerprintUserVerifier !== undefined,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this._username,
			this._sessionProvider,
			this._retryPolicyObtainingAuthorizationProvider,
			this.httpRequestHeaders
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.authenticate(message)
			.then((result: OnSuccessMessage) => {
				finish();
				const successMessage = OnSuccessMessage.fromJson(result);
				this._onSuccess?.(successMessage.authorizationProvider);
			})
			.catch((error: Error) => {
				finish();
				const authenticationError = new AuthenticationErrorConverter(error).convert();
				this._onError?.(authenticationError);
			});
	}
}
