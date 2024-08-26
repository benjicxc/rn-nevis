/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { FingerprintUserVerificationContext } from './FingerprintUserVerificationContext';
import type { FingerprintUserVerificationHandler } from './FingerprintUserVerificationHandler';
/**
 * The object in charge of interacting with the user to do fingerprint authentication.
 *
 * @see
 * - {@link Registration.fingerprintUserVerifier}
 * - {@link Authentication.fingerprintUserVerifier}
 * - {@link AuthCloudApiRegistration.fingerprintUserVerifier}
 * - {@link OutOfBandRegistration.fingerprintUserVerifier}
 * - {@link OutOfBandAuthentication.fingerprintUserVerifier}
 */
export declare abstract class FingerprintUserVerifier {
    /**
     * The user verification interaction.
     *
     * In the case of the registration the user must provide credentials again as required by the
     * FIDO UAF protocol.
     * In the case of the authentication, this is invoked for the user to provide credentials.
     * If there is a recoverable error during the verification, this method will be invoked again,
     * and the {@link FingerprintUserVerificationContext.lastRecoverableError} will contain the error.
     * The recoverable error can be used to inform the user of the recoverable error that occurred,
     * because the UI is the responsibility of the developer using the SDK. The operation must be canceled.
     *
     * @param context the object providing the information required for the verification process.
     * @param handler the object that must be notified with the result of the interaction.
     */
    abstract verifyFingerprint(context: FingerprintUserVerificationContext, handler: FingerprintUserVerificationHandler): Promise<void>;
    /**
     * This method is invoked when either valid fingerprint credentials were provided and verified
     * locally.
     *
     * The method is invoked after {@link verifyFingerprint} has been invoked and
     * {@link FingerprintUserVerificationHandler.listenForOsCredentials} is invoked in the
     * {@link FingerprintUserVerificationHandler} of {@link verifyFingerprint} and the end-user
     * provides valid biometric credentials.
     *
     * This method can be used for instance to hide the UI used to ask for credentials to the user
     * (some screen asking the user to use the fingerprint sensor) and then display some progress
     * message indicating that the operation is ongoing.
     *
     * Note that invoking this method does not mean that the UAF operation completed successfully
     * (this is notified through `onSuccess` methods once the FIDO UAF server validates the request
     * generated with the credentials).
     */
    abstract onValidCredentialsProvided(): void;
}
//# sourceMappingURL=FingerprintUserVerifier.d.ts.map