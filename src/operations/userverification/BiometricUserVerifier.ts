/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { BiometricUserVerificationContext } from './BiometricUserVerificationContext';
import type { BiometricUserVerificationHandler } from './BiometricUserVerificationHandler';

/**
 * The object in charge of interacting with the user to do biometric authentication.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK if the biometric authenticator is required.
 *
 * @see
 * - {@link Registration.biometricUserVerifier}
 * - {@link Authentication.biometricUserVerifier}
 * - {@link AuthCloudApiRegistration.biometricUserVerifier}
 * - {@link OutOfBandRegistration.biometricUserVerifier}
 * - {@link OutOfBandAuthentication.biometricUserVerifier}
 */
export abstract class BiometricUserVerifier {
	/**
	 * The user verification interaction.
	 *
	 * In the case of the registration the user must provide credentials again as required by the
	 * FIDO UAF protocol.
	 * In the case of the authentication, this is invoked for the user to provide credentials.
	 * In the case of the biometric authenticator, since the UI management is delegated to the
	 * operating system, the {@link verifyBiometric} method will not be invoked when a recoverable
	 * error occurs: the operating system will inform the end-user of the problem that happened.
	 * This implies that {@link verifyBiometric} is only invoked once when using the biometric authenticator.
	 *
	 * @param context the object providing the information required for the verification process.
	 * @param handler the object that must be notified with the result of the interaction.
	 */
	abstract verifyBiometric(
		context: BiometricUserVerificationContext,
		handler: BiometricUserVerificationHandler
	): Promise<void>;

	/**
	 * This method is invoked when either valid biometric credentials were provided and verified
	 * locally.
	 *
	 * The method is invoked after {@link verifyBiometric} has been invoked and
	 * {@link BiometricUserVerificationHandler.listenForOsCredentials} is invoked in the
	 * {@link BiometricUserVerificationHandler} of {@link verifyBiometric} and the end-user
	 * provides valid biometric credentials.
	 *
	 * This method can be used for instance to display some progress message indicating that the
	 * operation is ongoing.
	 * Note that invoking this method does not mean that the UAF operation completed successfully
	 * (this is notified through `onSuccess` methods once the FIDO UAF server validates the request
	 * generated with the credentials).
	 *
	 * If the user provided invalid credentials, and we are in the context of a recoverable error,
	 * then {@link verifyBiometric} will be invoked again.
	 * If it is a non-recoverable error, then the `onError` method will be invoked.
	 */
	abstract onValidCredentialsProvided(): void;
}
