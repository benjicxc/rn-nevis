/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { PinUserVerificationContext } from './PinUserVerificationContext';
import type { PinUserVerificationHandler } from './PinUserVerificationHandler';

/**
 * The object in charge of interacting with the user to do PIN authentication.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK if the PIN authenticator is required.
 *
 * @see
 * - {@link Authentication.pinUserVerifier}
 * - {@link OutOfBandAuthentication.pinUserVerifier}
 */
export abstract class PinUserVerifier {
	/**
	 * The user verification interaction.
	 *
	 * In the case of the registration the user must provide credentials again as
	 * required by the FIDO UAF protocol.
	 * In the case of the authentication, this is invoked for the user to provide
	 * credentials.
	 *
	 * If there is a recoverable error during the verification, this method will
	 * be invoked again, and the {@link PinUserVerificationContext.lastRecoverableError}
	 * will contain the error. The recoverable error can be used to inform the user
	 * of the recoverable error that occurred, because the UI is the responsibility
	 * of the developer using the SDK.
	 *
	 * If the user provided invalid credentials, and it results in a non-recoverable
	 * error, then the `onSuccess` method will be invoked.
	 *
	 * @param context the object providing the information required for the verification
	 * process.
	 * @param handler the object that must be notified with the result of the interaction.
	 */
	abstract verifyPin(
		context: PinUserVerificationContext,
		handler: PinUserVerificationHandler
	): Promise<void>;

	/**
	 * This method is invoked when valid PIN credentials were provided and verified
	 * locally.
	 *
	 * The method is invoked after {@link verifyPin} has been invoked and {@link PinUserVerificationHandler.verifyPin}
	 * is invoked in the {@link PinUserVerificationHandler} of {@link verifyPin} and the provided
	 * PIN credentials are valid.
	 *
	 * This method can be used for instance to hide the UI used to ask for credentials
	 * to the user (some text fields to get PIN credentials) and then display some
	 * progress message indicating that the operation is ongoing.
	 *
	 * Note that invoking this method does not mean that the UAF operation completed
	 * successfully (this is notified through `onSuccess` methods once the FIDO UAF
	 * server validates the request generated with the credentials).
	 */
	abstract onValidCredentialsProvided(): void;
}
