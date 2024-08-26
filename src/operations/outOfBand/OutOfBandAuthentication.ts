/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { AuthorizationProvider } from '../../authorization/AuthorizationProvider';
import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { OperationError } from '../../error/operation/OperationError';
import { OperationErrorConverter } from '../../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OnSuccessMessage } from '../../model/messages/in/OnSuccessMessage';
import { OutOfBandAuthenticationMessage } from '../../model/messages/out/OutOfBandAuthenticationMessage';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';
import { AccountSelector } from '../selection/AccountSelector';
import { AuthenticatorSelector } from '../selection/AuthenticatorSelector';
import { BiometricUserVerifier } from '../userverification/BiometricUserVerifier';
import { DevicePasscodeUserVerifier } from '../userverification/DevicePasscodeUserVerifier';
import { FingerprintUserVerifier } from '../userverification/FingerprintUserVerifier';
import { PinUserVerifier } from '../userverification/PinUserVerifier';

/**
 * The operation handling an out-of-band authentication.
 *
 * This is the object returned by the SDK, when an {@link OutOfBandPayload} was processed and the
 * {@link OutOfBandPayload} corresponds to an authentication operation.
 *
 * Usage example:
 * ```ts
 *   class AccountSelectorImpl extends AccountSelector {
 *       async selectAccount(
 *           context: AccountSelectionContext,
 *           handler: AccountSelectionHandler
 *       ): Promise<void> {
 *           await handler.username(username).catch(console.error);
 *       }
 *   }
 *
 *   class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *       async selectAuthenticator(
 *           context: AuthenticatorSelectionContext,
 *           handler: AuthenticatorSelectionHandler
 *       ): Promise<void> {
 *           await handler.aaid(aaid).catch(console.error);
 *       }
 *   }
 *
 *   class PinUserVerifierImpl extends PinUserVerifier {
 *       async verifyPin(
 *           context: PinVerificationContext,
 *           handler: PinVerificationHandler
 *       ): Promise<void> {
 *           await handler.verifyPin(pin).catch(console.error);
 *       }
 *   }
 *
 *   class BiometricUserVerifierImpl extends BiometricUserVerifier {
 *       async verifyBiometric(
 *           context: BiometricUserVerificationContext,
 *           handler: BiometricUserVerificationHandler
 *       ): Promise<void> {
 *           await handler
 *               .listenForOsCredentials(
 *                   BiometricPromptOptions.create(
 *                       'Biometric authentication required',
 *                       'Cancel',
 *                       'Please identify yourself.'
 *                   )
 *               )
 *               .catch(console.error);
 *       }
 *   }
 *
 *   async authenticateWithOutOfBand(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *        await client.operations.outOfBandOperation
 *            .payload(payload)
 *            .onRegistration((registration) => {
 *               // handle registration
 *            })
 *            .onAuthentication((authentication) => {
 *                authentication
 *                    .accountSelector(new AccountSelectorImpl())
 *                    .authenticatorSelector(new AuthenticatorSelectorImpl())
 *                    .pinUserVerifier(new PinUserVerifierImpl())
 *                    .biometricUserVerifier(new BiometricUserVerifierImpl())
 *                    .onSuccess((authorizationProvider) => {
 *                        // handle success
 *                    })
 *                    .onError((error) => {
 *                        // handle error
 *                    })
 *                    .execute();
 *            })
 *            .onError((_error) => {
 *                // handle out-of-band error
 *            })
 *            .execute();
 *   }
 * ```
 *
 * @see {@link OutOfBandOperation.onAuthentication}
 */
export abstract class OutOfBandAuthentication extends HttpOperation<OutOfBandAuthentication> {
	/**
	 * Specifies the object that will take care of the account selection.
	 *
	 * @param accountSelector the {@link AccountSelector}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract accountSelector(accountSelector: AccountSelector): OutOfBandAuthentication;

	/**
	 * Specifies the object that will take care of the selection of the authenticator to be used.
	 *
	 * **IMPORTANT** \
	 * Providing the authenticator selector is required.
	 *
	 * @param authenticatorSelector the {@link AuthenticatorSelector}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract authenticatorSelector(
		authenticatorSelector: AuthenticatorSelector
	): OutOfBandAuthentication;

	/**
	 * Specifies the object that will take care of the PIN user verification.
	 *
	 * **IMPORTANT** \
	 *
	 * Providing at least one of the {@link PinUserVerifier}, {@link BiometricUserVerifier} or
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param pinUserVerifier the {@link PinUserVerifier}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract pinUserVerifier(pinUserVerifier: PinUserVerifier): OutOfBandAuthentication;

	/**
	 * Specifies the object that will take care of the biometric user verification.
	 * It must be provided only if a biometric authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param biometricUserVerifier the {@link BiometricUserVerifier}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract biometricUserVerifier(
		biometricUserVerifier: BiometricUserVerifier
	): OutOfBandAuthentication;

	/**
	 * Specifies the object that will take care of the device passcode user verification.
	 * It must be provided only if a device passcode authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param devicePasscodeUserVerifier the {@link DevicePasscodeUserVerifier}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): OutOfBandAuthentication;

	/**
	 * Specifies the object that will take care of the fingerprint user verification.
	 * It must be provided only if a fingerprint authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param fingerprintUserVerifier the {@link FingerprintUserVerifier}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): OutOfBandAuthentication;

	/**
	 * Specifies the object that will be invoked if the authentication was successful.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the callback which receives an optional {@link AuthorizationProvider}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract onSuccess(
		onSuccess: (authorizationProvider?: AuthorizationProvider) => void
	): OutOfBandAuthentication;

	/**
	 * Specifies the object that will be invoked if the authentication failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the callback which receives an {@link OperationError}.
	 * @returns an {@link OutOfBandAuthentication} object.
	 */
	abstract onError(onError: (error: OperationError) => void): OutOfBandAuthentication;
}

export class OutOfBandAuthenticationImpl
	extends HttpOperationImpl<OutOfBandAuthentication>
	implements OutOfBandAuthentication
{
	operationId: string;
	private _accountSelector?: AccountSelector;
	private _authenticatorSelector?: AuthenticatorSelector;
	private _pinUserVerifier?: PinUserVerifier;
	private _biometricUserVerifier?: BiometricUserVerifier;
	private _devicePasscodeUserVerifier?: DevicePasscodeUserVerifier;
	private _fingerprintUserVerifier?: FingerprintUserVerifier;
	private _onSuccess?: (authorizationProvider?: AuthorizationProvider) => void;
	private _onError?: (error: OperationError) => void;

	constructor(operationId: string) {
		super();
		this.operationId = operationId;
	}

	accountSelector(accountSelector: AccountSelector): OutOfBandAuthentication {
		this._accountSelector = accountSelector;
		return this;
	}

	authenticatorSelector(authenticatorSelector: AuthenticatorSelector): OutOfBandAuthentication {
		this._authenticatorSelector = authenticatorSelector;
		return this;
	}

	pinUserVerifier(pinUserVerifier: PinUserVerifier): OutOfBandAuthentication {
		this._pinUserVerifier = pinUserVerifier;
		return this;
	}

	biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): OutOfBandAuthentication {
		this._biometricUserVerifier = biometricUserVerifier;
		return this;
	}

	devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): OutOfBandAuthentication {
		this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
		return this;
	}

	fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): OutOfBandAuthentication {
		this._fingerprintUserVerifier = fingerprintUserVerifier;
		return this;
	}

	onSuccess(
		onSuccess: (authorizationProvider?: AuthorizationProvider) => void
	): OutOfBandAuthentication {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: OperationError) => void): OutOfBandAuthentication {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operation = new UserInteractionPlatformOperationImpl(
			this.operationId,
			this._authenticatorSelector,
			this._accountSelector,
			this._biometricUserVerifier,
			this._devicePasscodeUserVerifier,
			this._fingerprintUserVerifier,
			this._pinUserVerifier
		);

		/// IMPORTANT: no need to start event listening
		/// since it is started by OutOfBandOperation already
		PlatformOperationCache.getInstance().put(operation);

		const message = new OutOfBandAuthenticationMessage(
			this.operationId,
			this._accountSelector !== undefined,
			this._authenticatorSelector !== undefined,
			false,
			this._pinUserVerifier !== undefined,
			this._biometricUserVerifier !== undefined,
			this._devicePasscodeUserVerifier !== undefined,
			this._fingerprintUserVerifier !== undefined,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this.httpRequestHeaders
		);

		const finish = () => {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(this.operationId);
		};

		return NevisMobileAuthenticationSdkReact.oobAuthenticate(message)
			.then((data: OnSuccessMessage) => {
				finish();
				const successMessage = OnSuccessMessage.fromJson(data);
				this._onSuccess?.(successMessage.authorizationProvider);
			})
			.catch((error: Error) => {
				finish();
				const operationError = new OperationErrorConverter(error).convert();
				this._onError?.(operationError);
			});
	}
}
