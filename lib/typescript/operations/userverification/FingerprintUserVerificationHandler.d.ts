/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { type OsAuthenticationListenHandler } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
/**
 * The objects consuming the outcome of an interaction where the user provides fingerprint credentials.
 *
 * This is used with the {@link Aaid.FINGERPRINT} authenticator attestation identifier.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
export declare abstract class FingerprintUserVerificationHandler extends UserVerificationHandler {
    /**
     * When this method is invoked, the SDK will wait for the user to provide credentials.
     *
     * If the credentials are provided, it will be checked that they are valid.
     *
     * Before invoking this method, some user interface should be presented to the end user asking
     * to provide OS credentials (in the case of fingerprint, the user should be asked to place
     * finger in the sensor to authenticate).
     *
     * @returns an {@link OsAuthenticationListenHandler} that can be used to cancel listening for OS
     * credentials.
     */
    abstract listenForOsCredentials(): Promise<OsAuthenticationListenHandler>;
}
export declare class FingerprintUserVerificationHandlerImpl extends FingerprintUserVerificationHandler {
    private readonly _operationId;
    private readonly _listenForOsCredentials;
    constructor(operationId: string);
    listenForOsCredentials(): Promise<OsAuthenticationListenHandler>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=FingerprintUserVerificationHandler.d.ts.map