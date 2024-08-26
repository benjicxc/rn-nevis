/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OperationMessage } from './OperationMessage';
/**
 * Common ancestor for user interaction operation based messages.
 */
export declare abstract class UserInteractionOperationMessage extends OperationMessage {
    /**
     * Flag that tells whether the account selector is provided.
     */
    abstract accountSelectorProvided: boolean;
    /**
     * Flag that tells whether the authenticator selector is provided.
     */
    abstract authenticatorSelectorProvided: boolean;
    /**
     * Flag that tells whether the PIN enroller is provided.
     */
    abstract pinEnrollerProvided: boolean;
    /**
     * Flag that tells whether the PIN user verifier is provided.
     */
    abstract pinUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the biometric user verifier is provided.
     */
    abstract biometricUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the device passcode user verifier is provided.
     */
    abstract devicePasscodeUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the fingerprint user verifier is provided.
     */
    abstract fingerprintUserVerifierProvided: boolean;
}
//# sourceMappingURL=UserInteractionOperationMessage.d.ts.map