/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { OperationError } from '../../error/operation/OperationError';
import { OperationErrorConverter } from '../../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import { DeviceInformation } from '../../localData/DeviceInformation';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OutOfBandRegistrationMessage } from '../../model/messages/out/OutOfBandRegistrationMessage';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';
import type { PinEnroller } from '../pin/PinEnroller';
import type { AuthenticatorSelector } from '../selection/AuthenticatorSelector';
import type { BiometricUserVerifier } from '../userverification/BiometricUserVerifier';
import type { DevicePasscodeUserVerifier } from '../userverification/DevicePasscodeUserVerifier';
import type { FingerprintUserVerifier } from '../userverification/FingerprintUserVerifier';

/**
 * The operation handling an out-of-band registration. This is the object returned by the SDK, when
 * an {@link OutOfBandPayload} was processed and the {@link OutOfBandPayload} corresponds to a
 * registration operation.
 *
 * Usage example:
 * ```ts
 *   class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *       async selectAuthenticator(
 *           context: AuthenticatorSelectionContext,
 *           handler: AuthenticatorSelectionHandler
 *       ): Promise<void> {
 *           await handler.aaid(aaid).catch(console.error);
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
 *   async registerWithOutOfBand(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload,
 *       deviceInformation: DeviceInformation
 *   ): Promise<void> {
 *        await client.operations.outOfBandOperation
 *            .payload(payload)
 *            .onRegistration((registration) => {
 *                registration
 *                    .deviceInformation(deviceInformation)
 *                    .authenticatorSelector(new AuthenticatorSelectorImpl())
 *                    .biometricUserVerifier(new BiometricUserVerifierImpl())
 *                    .onSuccess(() => {
 *                        // handle success
 *                    })
 *                    .onError((_error) => {
 *                        // handle error
 *                    })
 *                    .execute();
 *            })
 *            .onAuthentication((authentication) => {
 *                // handle authentication
 *            })
 *            .onError((_error) => {
 *                // handle out-of-band error
 *            })
 *            .execute();
 *   }
 * ```
 *
 * The biometric and Device Passcode authenticators are enrolled at the OS level. That is why, if one
 * of them must be registered, the user must authenticate through {@link BiometricUserVerifier},
 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier}. In the case of the PIN,
 * the PIN is enrolled during registration, so no authentication is needed.
 *
 * @see {@link OutOfBandOperation.onRegistration}
 */
export abstract class OutOfBandRegistration extends HttpOperation<OutOfBandRegistration> {
	/**
	 * Specifies the device information to be used.
	 *
	 * The {@link DeviceInformation} is required only if you require support for encrypted out-of-band
	 * payloads or push notifications. If a {@link DeviceInformation} was already provided in an
	 * existing registration, the provided value will be ignored.
	 *
	 * @param deviceInformation the device information.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract deviceInformation(deviceInformation: DeviceInformation): OutOfBandRegistration;

	/**
	 * Specifies whether [Class 2 (formerly weak)](https://source.android.com/docs/security/features/biometric/measure#biometric-classes)
	 * biometric sensors are allowed if the biometric authenticator is selected.
	 *
	 * **IMPORTANT** \
	 * This method is Android specific and will be ignored on iOS platform.
	 *
	 * By default, the SDK will only allow to use Class 3 (formerly strong) sensors. Using Class 2
	 * sensors is less secure and discouraged. When a Class 2 sensor is used, the FIDO UAF keys are
	 * not protected by the operating system by requiring user authentication.
	 *
	 * If the SDK detects that only Class 3 (strong) biometric sensors are available in the mobile
	 * device, even if Class 2 sensors are allowed, the FIDO UAF credentials will be protected by
	 * the operating system by requiring user authentication.
	 *
	 * However, in some cases it may be acceptable for the sake of end-user convenience. Allowing
	 * Class 2 sensors will enable for instance the use of face recognition in some Samsung devices.
	 *
	 * @param allowClass2AndroidSensors specifies whether Class 2 biometric sensors are allowed if
	 * the biometric authenticator is selected.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract allowClass2AndroidSensors(allowClass2AndroidSensors: boolean): OutOfBandRegistration;

	/**
	 * Specifies whether the OS device passcode can be used as fallback during biometric authentication.
	 *
	 * If not specified, the device passcode cannot be used as fallback.
	 *
	 * @param allowDevicePasscodeAsFallback indicates whether the device passcode can be used as fallback.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract allowDevicePasscodeAsFallback(
		allowDevicePasscodeAsFallback: boolean
	): OutOfBandRegistration;

	/**
	 * Specifies whether the authenticator must be invalidated if the user adds new biometric
	 * credentials in the OS settings. If the authenticator has been invalidated, and you try to
	 * authenticate with it, an error with code {@link FidoErrorCodeType.KeyDisappearedPermanently}
	 * will be returned by the authentication operation.
	 *
	 * This setting only applies to biometric {@link Aaid.BIOMETRIC} and fingerprint {@link Aaid.FINGERPRINT}
	 * authenticators.
	 * By setting this parameter to `true`, you increase the security but there is a loss of
	 * convenience: adding a new OS biometric credential does not imply necessarily that there is a
	 * security risk, but if the end-user does it, a new registration will be required, because an
	 * invalidated authenticator cannot be recovered.
	 *
	 * If not specified, the authenticator will be invalidated when the user adds a new biometric
	 * credential in the OS settings.
	 *
	 * @param invalidateOnNewOsBiometrics indicates whether an addition of biometric credentials in
	 * the OS should invalidate this authenticator.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract invalidateOnNewOsBiometrics(
		invalidateOnNewOsBiometrics: boolean
	): OutOfBandRegistration;

	/**
	 * Specifies the object that will take care of the selection of the authenticator to be used.
	 *
	 * **IMPORTANT** \
	 * Providing the authenticator selector is required.
	 *
	 * @param authenticatorSelector the {@link AuthenticatorSelector}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract authenticatorSelector(
		authenticatorSelector: AuthenticatorSelector
	): OutOfBandRegistration;

	/**
	 * Specifies the object that will take care of enrolling the PIN of the authenticator.
	 * It must be provided only if a PIN authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param pinEnroller the {@link PinEnroller}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract pinEnroller(pinEnroller: PinEnroller): OutOfBandRegistration;

	/**
	 * Specifies the object that will take care of the biometric user verification.
	 * It must be provided only if a biometric authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param biometricUserVerifier the {@link BiometricUserVerifier}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract biometricUserVerifier(
		biometricUserVerifier: BiometricUserVerifier
	): OutOfBandRegistration;

	/**
	 * Specifies the object that will take care of the device passcode user verification.
	 * It must be provided only if a device passcode authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param devicePasscodeUserVerifier the {@link DevicePasscodeUserVerifier}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): OutOfBandRegistration;

	/**
	 * Specifies the object that will take care of the fingerprint user verification.
	 * It must be provided only if a fingerprint authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param fingerprintUserVerifier the {@link FingerprintUserVerifier}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): OutOfBandRegistration;

	/**
	 * Specifies the object that will be invoked if the registration completed successfully.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the callback which is invoked on successful registration.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract onSuccess(onSuccess: () => void): OutOfBandRegistration;

	/**
	 * Specifies the object that will be invoked if the registration failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the callback which receives an {@link OperationError}.
	 * @returns an {@link OutOfBandRegistration} object.
	 */
	abstract onError(onError: (error: OperationError) => void): OutOfBandRegistration;
}

export class OutOfBandRegistrationImpl
	extends HttpOperationImpl<OutOfBandRegistration>
	implements OutOfBandRegistration
{
	operationId: string;
	private _deviceInformation?: DeviceInformation;
	private _allowClass2AndroidSensors?: boolean;
	private _allowDevicePasscodeAsFallback?: boolean;
	private _invalidateOnNewOsBiometrics?: boolean;
	private _authenticatorSelector?: AuthenticatorSelector;
	private _pinEnroller?: PinEnroller;
	private _biometricUserVerifier?: BiometricUserVerifier;
	private _devicePasscodeUserVerifier?: DevicePasscodeUserVerifier;
	private _fingerprintUserVerifier?: FingerprintUserVerifier;
	private _onSuccess?: () => void;
	private _onError?: (error: OperationError) => void;

	constructor(operationId: string) {
		super();
		this.operationId = operationId;
	}

	deviceInformation(deviceInformation: DeviceInformation): OutOfBandRegistration {
		this._deviceInformation = deviceInformation;
		return this;
	}

	allowClass2AndroidSensors(allowClass2AndroidSensors: boolean): OutOfBandRegistration {
		this._allowClass2AndroidSensors = allowClass2AndroidSensors;
		return this;
	}

	allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback: boolean): OutOfBandRegistration {
		this._allowDevicePasscodeAsFallback = allowDevicePasscodeAsFallback;
		return this;
	}

	invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics: boolean): OutOfBandRegistration {
		this._invalidateOnNewOsBiometrics = invalidateOnNewOsBiometrics;
		return this;
	}

	authenticatorSelector(authenticatorSelector: AuthenticatorSelector): OutOfBandRegistration {
		this._authenticatorSelector = authenticatorSelector;
		return this;
	}

	pinEnroller(pinEnroller: PinEnroller): OutOfBandRegistration {
		this._pinEnroller = pinEnroller;
		return this;
	}

	biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): OutOfBandRegistration {
		this._biometricUserVerifier = biometricUserVerifier;
		return this;
	}

	devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): OutOfBandRegistration {
		this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
		return this;
	}

	fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): OutOfBandRegistration {
		this._fingerprintUserVerifier = fingerprintUserVerifier;
		return this;
	}

	onSuccess(onSuccess: () => void): OutOfBandRegistration {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: OperationError) => void): OutOfBandRegistration {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operation = new UserInteractionPlatformOperationImpl(
			this.operationId,
			this._authenticatorSelector,
			undefined,
			this._biometricUserVerifier,
			this._devicePasscodeUserVerifier,
			this._fingerprintUserVerifier,
			undefined,
			undefined,
			this._pinEnroller
		);

		/// IMPORTANT: no need to start event listening
		/// since it is started by OutOfBandOperation already
		PlatformOperationCache.getInstance().put(operation);

		const message = new OutOfBandRegistrationMessage(
			this.operationId,
			false,
			this._authenticatorSelector !== undefined,
			this._pinEnroller !== undefined,
			false,
			this._biometricUserVerifier !== undefined,
			this._devicePasscodeUserVerifier !== undefined,
			this._fingerprintUserVerifier !== undefined,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this.httpRequestHeaders,
			this._deviceInformation,
			this._pinEnroller?.pinPolicy,
			this._allowClass2AndroidSensors,
			this._allowDevicePasscodeAsFallback,
			this._invalidateOnNewOsBiometrics
		);

		const finish = () => {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(this.operationId);
		};

		return NevisMobileAuthenticationSdkReact.oobRegister(message)
			.then(() => {
				finish();
				this._onSuccess?.();
			})
			.catch((error: Error) => {
				finish();
				const operationError = new OperationErrorConverter(error).convert();
				this._onError?.(operationError);
			});
	}
}
