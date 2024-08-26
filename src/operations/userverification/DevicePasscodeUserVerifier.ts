/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { DevicePasscodeUserVerificationContext } from './DevicePasscodeUserVerificationContext';
import type { DevicePasscodeUserVerificationHandler } from './DevicePasscodeUserVerificationHandler';

/**
 * The object in charge of interacting with the user to do biometric authentication.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK if the device passcode authenticator is required.
 *
 * @see
 * - {@link Registration.devicePasscodeUserVerifier}
 * - {@link Authentication.devicePasscodeUserVerifier}
 * - {@link AuthCloudApiRegistration.devicePasscodeUserVerifier}
 * - {@link OutOfBandRegistration.devicePasscodeUserVerifier}
 * - {@link OutOfBandAuthentication.devicePasscodeUserVerifier}
 */
export abstract class DevicePasscodeUserVerifier {
	/**
	 * The user verification interaction.
	 *
	 * In the case of the registration the user must provide credentials again as required by the
	 * FIDO UAF protocol.
	 * In the case of the authentication, this is invoked for the user to provide credentials.
	 * In the case of the device passcode authenticator, since the UI management is delegated to the
	 * operating system, the {@link verifyDevicePasscode} method will not be invoked when a recoverable
	 * error occurs: the operating system will inform the end-user of the problem that happened.
	 * This implies that {@link verifyDevicePasscode} is only invoked once when using the device
	 * passcode authenticator.
	 *
	 * @param context the object providing the information required for the verification process.
	 * @param handler the object that must be notified with the result of the interaction.
	 */
	abstract verifyDevicePasscode(
		context: DevicePasscodeUserVerificationContext,
		handler: DevicePasscodeUserVerificationHandler
	): Promise<void>;

	/**
	 * This method is invoked when either valid biometric credentials were provided and verified
	 * locally.
	 *
	 * The method is invoked after {@link verifyDevicePasscode} has been invoked and
	 * {@link DevicePasscodeUserVerificationHandler.listenForOsCredentials} is invoked in the
	 * {@link DevicePasscodeUserVerificationHandler} of {@link verifyDevicePasscode} and the end-user
	 * provides valid device passcode credentials.
	 *
	 * This method can be used for instance to display some progress message indicating that the
	 * operation is ongoing.
	 * Note that invoking this method does not mean that the UAF operation completed successfully
	 * (this is notified through `onSuccess` methods once the FIDO UAF server validates the request
	 * generated with the credentials).
	 *
	 * If the user provided invalid credentials, and we are in the context of a recoverable error,
	 * then {@link verifyDevicePasscode} will be invoked again.
	 * If it is a non-recoverable error, then the `onError` method will be invoked.
	 */
	abstract onValidCredentialsProvided(): void;
}
