/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import type { PinEnroller } from './pin/PinEnroller';
import type { AuthenticatorSelector } from './selection/AuthenticatorSelector';
import type { BiometricUserVerifier } from './userverification/BiometricUserVerifier';
import type { DevicePasscodeUserVerifier } from './userverification/DevicePasscodeUserVerifier';
import type { FingerprintUserVerifier } from './userverification/FingerprintUserVerifier';
import { AuthorizationProvider } from '../authorization/AuthorizationProvider';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { OperationError } from '../error/operation/OperationError';
import { OperationErrorConverter } from '../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import { DeviceInformation } from '../localData/DeviceInformation';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { RegistrationMessage } from '../model/messages/out/RegistrationMessage';

/**
 * The object that can be used to trigger a registration operation.
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
 *   async register(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       deviceInformation: DeviceInformation
 *    ): Promise<void> {
 *       await client.operations.registration
 *           .username(username)
 *           .deviceInformation(deviceInformation)
 *           .authenticatorSelector(new AuthenticatorSelectorImpl())
 *           .biometricUserVerifier(new BiometricUserVerifierImpl())
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *    }
 * ```
 *
 * The biometric and Device Passcode authenticators are enrolled at the OS level. That is why, if one
 * of them must be registered, the user must authenticate through {@link BiometricUserVerifier},
 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier}. In the case of the PIN,
 * the PIN is enrolled during registration, so no authentication is needed.
 *
 * @see {@link Operations.registration}
 */
export abstract class Registration extends HttpOperation<Registration> {
	/**
	 * Specifies the username that must be used to register.
	 *
	 * **IMPORTANT** \
	 * Providing the username is required.
	 *
	 * @param username the username.
	 * @returns a {@link Registration} object.
	 */
	abstract username(username: string): Registration;

	/**
	 * Specifies the base URL of the server where the registration should be made.
	 *
	 * **NOTE** \
	 * If no server base URL is provided, then the base URL defined in {@link ConfigurationBuilder.baseUrl}
	 * will be used.
	 *
	 * **IMPORTANT** \
	 * It is assumed that all the servers have the same endpoints, thus only the scheme, hostname and
	 * port of the URL will be taken into account.
	 *
	 * Examples of base URL resolution in registration:
	 * | Configuration base URL | Provided server URL in Registration | Resulting Server URL |
	 * | --- | --- | --- |
	 * | https://server/path | https://other.server | https://other.server/path |
	 * | https://server:443/path | https://other.server/path | https://other.server/path |
	 * | https://server/path | http://other.server:80/otherpath | http://other.server:80/path |
	 *
	 * @param serverUrl the server URL.
	 * @returns a {@link Registration} object.
	 */
	abstract serverUrl(serverUrl: string): Registration;

	/**
	 * Specifies the device information to be used.
	 *
	 * The {@link DeviceInformation} is required only if you require support for encrypted out-of-band
	 * payloads or push notifications. If a {@link DeviceInformation} was already provided in an
	 * existing registration, the provided value will be ignored.
	 *
	 * @param deviceInformation the device information.
	 * @returns a {@link Registration} object.
	 */
	abstract deviceInformation(deviceInformation: DeviceInformation): Registration;

	/**
	 * Specifies the authorization provider that must be used to register the authenticator.
	 *
	 * @param authorizationProvider the {@link AuthorizationProvider}.
	 * @returns a {@link Registration} object.
	 */
	abstract authorizationProvider(authorizationProvider: AuthorizationProvider): Registration;

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
	 * @returns a {@link Registration} object.
	 */
	abstract allowClass2AndroidSensors(allowClass2AndroidSensors: boolean): Registration;

	/**
	 * Specifies whether the OS device passcode can be used as fallback during biometric authentication.
	 *
	 * If not specified, the device passcode cannot be used as fallback.
	 *
	 * @param allowDevicePasscodeAsFallback indicates whether the device passcode can be used as fallback.
	 * @returns a {@link Registration} object.
	 */
	abstract allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback: boolean): Registration;

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
	 * @returns a {@link Registration} object.
	 */
	abstract invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics: boolean): Registration;

	/**
	 * Specifies the object that will take care of the selection of the authenticator to be used.
	 *
	 * **IMPORTANT** \
	 * Providing the authenticator selector is required.
	 *
	 * @param authenticatorSelector the {@link AuthenticatorSelector}.
	 * @returns a {@link Registration} object.
	 */
	abstract authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Registration;

	/**
	 * Specifies the object that will take care of enrolling the PIN of the authenticator.
	 * It must be provided only if a PIN authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param pinEnroller the {@link PinEnroller}.
	 * @returns a {@link Registration} object.
	 */
	abstract pinEnroller(pinEnroller: PinEnroller): Registration;

	/**
	 * Specifies the object that will take care of the biometric user verification.
	 * It must be provided only if a biometric authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param biometricUserVerifier the {@link BiometricUserVerifier}.
	 * @returns a {@link Registration} object.
	 */
	abstract biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Registration;

	/**
	 * Specifies the object that will take care of the device passcode user verification.
	 * It must be provided only if a device passcode authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param devicePasscodeUserVerifier the {@link DevicePasscodeUserVerifier}.
	 * @returns a {@link Registration} object.
	 */
	abstract devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): Registration;

	/**
	 * Specifies the object that will take care of the fingerprint user verification.
	 * It must be provided only if a fingerprint authenticator must be registered.
	 *
	 * **IMPORTANT** \
	 * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
	 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
	 *
	 * @param fingerprintUserVerifier the {@link FingerprintUserVerifier}.
	 * @returns a {@link Registration} object.
	 */
	abstract fingerprintUserVerifier(
		fingerprintUserVerifier: FingerprintUserVerifier
	): Registration;

	/**
	 * Specifies the object that will be invoked if the registration completed successfully.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the callback which is invoked on successful registration.
	 * @returns a {@link Registration} object.
	 */
	abstract onSuccess(onSuccess: () => void): Registration;

	/**
	 * Specifies the object that will be invoked if the registration failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the callback which receives an {@link OperationError}.
	 * @returns a {@link Registration} object.
	 */
	abstract onError(onError: (error: OperationError) => void): Registration;
}

export class RegistrationImpl extends HttpOperationImpl<Registration> implements Registration {
	private _username?: string;
	private _serverUrl?: string;
	private _deviceInformation?: DeviceInformation;
	private _authorizationProvider?: AuthorizationProvider;
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

	username(username: string): Registration {
		this._username = username;
		return this;
	}

	serverUrl(serverUrl: string): Registration {
		this._serverUrl = serverUrl;
		return this;
	}

	deviceInformation(deviceInformation: DeviceInformation): Registration {
		this._deviceInformation = deviceInformation;
		return this;
	}

	authorizationProvider(authorizationProvider: AuthorizationProvider): Registration {
		this._authorizationProvider = authorizationProvider;
		return this;
	}

	allowClass2AndroidSensors(allowClass2AndroidSensors: boolean): Registration {
		this._allowClass2AndroidSensors = allowClass2AndroidSensors;
		return this;
	}

	allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback: boolean): Registration {
		this._allowDevicePasscodeAsFallback = allowDevicePasscodeAsFallback;
		return this;
	}

	invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics: boolean): Registration {
		this._invalidateOnNewOsBiometrics = invalidateOnNewOsBiometrics;
		return this;
	}

	authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Registration {
		this._authenticatorSelector = authenticatorSelector;
		return this;
	}

	pinEnroller(pinEnroller: PinEnroller): Registration {
		this._pinEnroller = pinEnroller;
		return this;
	}

	biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Registration {
		this._biometricUserVerifier = biometricUserVerifier;
		return this;
	}

	devicePasscodeUserVerifier(
		devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	): Registration {
		this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
		return this;
	}

	fingerprintUserVerifier(fingerprintUserVerifier: FingerprintUserVerifier): Registration {
		this._fingerprintUserVerifier = fingerprintUserVerifier;
		return this;
	}

	onSuccess(onSuccess: () => void): Registration {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: OperationError) => void): Registration {
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
			undefined,
			undefined,
			this._pinEnroller
		);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new RegistrationMessage(
			operationId,
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
			this._username,
			this._serverUrl,
			this._deviceInformation,
			this._authorizationProvider,
			this._pinEnroller?.pinPolicy,
			this._allowClass2AndroidSensors,
			this._allowDevicePasscodeAsFallback,
			this._invalidateOnNewOsBiometrics
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.inBandRegister(message)
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
