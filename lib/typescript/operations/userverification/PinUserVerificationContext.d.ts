/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { UserVerificationContext } from './UserVerificationContext';
import type { PinUserVerificationError } from '../../error/userVerification/PinUserVerificationError';
import { Authenticator } from '../../localData/Authenticator';
import { PinAuthenticatorProtectionStatus } from '../pin/PinAuthenticatorProtectionStatus';
/**
 * The object providing information about the PIN user verification
 * (i.e. the user credential validation) operation to be done.
 *
 * This object contains the information required to ask the user to authenticate:
 * the authenticator to be used, whether there were previous errors authenticating, etc.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
export declare abstract class PinUserVerificationContext extends UserVerificationContext {
    /**
     * The authenticator protection status.
     */
    abstract authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;
    /**
     * When a recoverable error occurred during the last credential verification, it returns the
     * object describing the last error.
     *
     * If present, this means that an invalid PIN was provided in the previous invocation to
     * {@link PinUserVerificationHandler.verifyPin} and thus the protection status is
     * {@link PinProtectionStatusLastAttemptFailed}.
     */
    abstract lastRecoverableError?: PinUserVerificationError;
    /**
     * Alternate constructor that creates a {@link UserVerificationContext} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created {@link PinUserVerificationContext} instance.
     */
    static fromJson(json: any): PinUserVerificationContext;
}
export declare class PinUserVerificationContextImpl extends PinUserVerificationContext {
    authenticator: Authenticator;
    authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;
    lastRecoverableError?: PinUserVerificationError;
    constructor(authenticator: Authenticator, authenticatorProtectionStatus: PinAuthenticatorProtectionStatus, lastRecoverableError?: PinUserVerificationError);
    static fromJson(json: any): PinUserVerificationContextImpl;
}
//# sourceMappingURL=PinUserVerificationContext.d.ts.map