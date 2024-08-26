/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { HttpOperationMessage } from './HttpOperationMessage';
import { UserInteractionOperationMessage } from './UserInteractionOperationMessage';
import { type DeviceInformation } from '../../../localData/DeviceInformation';
import type { PinPolicy } from '../../../operations/pin/PinPolicy';
import type { RequestHeaders } from '../../../operations/RequestHeaders';

/**
 * Holds the parameters of the out-of-band registration operation call.
 */
export class OutOfBandRegistrationMessage
	implements UserInteractionOperationMessage, HttpOperationMessage
{
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * Flag that tells whether the account selector is provided.
	 */
	accountSelectorProvided: boolean;

	/**
	 * Flag that tells whether the authenticator selector is provided.
	 */
	authenticatorSelectorProvided: boolean;

	/**
	 * Flag that tells whether the PIN enroller is provided.
	 */
	pinEnrollerProvided: boolean;

	/**
	 * Flag that tells whether the PIN user verifier is provided.
	 */
	pinUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the biometric user verifier is provided.
	 */
	biometricUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the device passcode user verifier is provided.
	 */
	devicePasscodeUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the fingerprint user verifier is provided.
	 */
	fingerprintUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the success callback is provided.
	 */
	onSuccessProvided: boolean;

	/**
	 * Flag that tells whether the error callback is provided.
	 */
	onErrorProvided: boolean;

	/**
	 * Specifies the additional request headers that must be included in the HTTP requests sent by
	 * the operation.
	 */
	requestHeaders?: RequestHeaders;

	/**
	 * The device information to be used.
	 */
	deviceInformation?: DeviceInformation;

	/**
	 * The pin policy to be used.
	 */
	pinPolicy?: PinPolicy;

	/**
	 * Specifies whether [Class 2 (formerly weak)](https://source.android.com/docs/security/features/biometric/measure#biometric-classes)
	 * biometric sensors are allowed if the biometric authenticator is selected.
	 *
	 * **IMPORTANT:** \
	 * This property is Android specific and will be ignored by iOS native plugin.
	 *
	 * By default, the SDK will only allow to use Class 3 (formerly strong) sensors.
	 * Using Class 2 sensors is less secure and discouraged. When a Class 2 sensor is used, the FIDO
	 * UAF keys are not protected by the operating system by requiring user authentication.
	 *
	 * If the SDK detects that only Class 3 (strong) biometric sensors are available in the mobile
	 * device, even if Class 2 sensors are allowed, the FIDO UAF credentials will be protected by
	 * the operating system by requiring user authentication.
	 *
	 * However, in some cases it may be acceptable for the sake of end-user convenience. Allowing
	 * Class 2 sensors will enable for instance the use of face recognition in some Samsung devices.
	 */
	allowClass2AndroidSensors?: boolean;

	/**
	 * Specifies whether the OS device passcode can be used as fallback during biometric
	 * authentication. If not specified, the device passcode cannot be used as fallback.
	 */
	allowDevicePasscodeAsFallback?: boolean;

	/**
	 * Specifies whether the authenticator must be invalidated if the user adds new biometric
	 * credentials in the OS settings. If not specified, the authenticator will not be invalidated
	 * when the user adds a new biometric credential in the OS settings.
	 */
	invalidateOnNewOsBiometrics?: boolean;

	/**
	 * Creates a new instance.
	 *
	 * @param operationId the identifier of the operation.
	 * @param accountSelectorProvided flag that tells whether the account selector is provided.
	 * @param authenticatorSelectorProvided flag that tells whether the authenticator selector is provided.
	 * @param pinEnrollerProvided flag that tells whether the PIN enroller is provided.
	 * @param pinUserVerifierProvided flag that tells whether the PIN user verifier is provided.
	 * @param biometricUserVerifierProvided flag that tells whether the biometric user verifier is
	 * provided.
	 * @param devicePasscodeUserVerifierProvided flag that tells whether the device passcode user
	 * verifier is provided.
	 * @param fingerprintUserVerifierProvided flag that tells whether the fingerprint user verifier
	 * is provided.
	 * @param onSuccessProvided flag that tells whether the success callback is provided.
	 * @param onErrorProvided flag that tells whether the error callback is provided.
	 * @param requestHeaders specifies the additional request headers that must be included in the
	 * HTTP requests sent by the operation.
	 * @param deviceInformation the device information to be used.
	 * @param pinPolicy the pin policy to be used.
	 * @param allowClass2AndroidSensors specifies whether [Class 2 (formerly weak)](https://source.android.com/docs/security/features/biometric/measure#biometric-classes)
	 * biometric sensors are allowed if the biometric authenticator is selected.
	 * @param allowDevicePasscodeAsFallback specifies whether the OS device passcode can be used as
	 * fallback during biometric authentication.
	 * @param invalidateOnNewOsBiometrics specifies whether the authenticator must be invalidated if
	 * the user adds new biometric credentials in the OS settings.
	 */
	constructor(
		operationId: string,
		accountSelectorProvided: boolean,
		authenticatorSelectorProvided: boolean,
		pinEnrollerProvided: boolean,
		pinUserVerifierProvided: boolean,
		biometricUserVerifierProvided: boolean,
		devicePasscodeUserVerifierProvided: boolean,
		fingerprintUserVerifierProvided: boolean,
		onSuccessProvided: boolean,
		onErrorProvided: boolean,
		requestHeaders?: RequestHeaders,
		deviceInformation?: DeviceInformation,
		pinPolicy?: PinPolicy,
		allowClass2AndroidSensors?: boolean,
		allowDevicePasscodeAsFallback?: boolean,
		invalidateOnNewOsBiometrics?: boolean
	) {
		this.operationId = operationId;
		this.accountSelectorProvided = accountSelectorProvided;
		this.authenticatorSelectorProvided = authenticatorSelectorProvided;
		this.pinEnrollerProvided = pinEnrollerProvided;
		this.pinUserVerifierProvided = pinUserVerifierProvided;
		this.biometricUserVerifierProvided = biometricUserVerifierProvided;
		this.devicePasscodeUserVerifierProvided = devicePasscodeUserVerifierProvided;
		this.fingerprintUserVerifierProvided = fingerprintUserVerifierProvided;
		this.onSuccessProvided = onSuccessProvided;
		this.onErrorProvided = onErrorProvided;
		this.requestHeaders = requestHeaders;
		this.deviceInformation = deviceInformation;
		this.pinPolicy = pinPolicy;
		this.allowClass2AndroidSensors = allowClass2AndroidSensors;
		this.allowDevicePasscodeAsFallback = allowDevicePasscodeAsFallback;
		this.invalidateOnNewOsBiometrics = invalidateOnNewOsBiometrics;
	}
}
