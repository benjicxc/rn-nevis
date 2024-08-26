/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { BiometricPromptOptions } from './BiometricPromptOptions';
import { type OsAuthenticationListenHandler } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
/**
 * The objects consuming the outcome of an interaction where the user provides biometric credentials.
 *
 * This is used with the {@link Aaid.BIOMETRIC} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link BiometricUserVerifier.verifyBiometric}
 */
export declare abstract class BiometricUserVerificationHandler extends UserVerificationHandler {
    /**
     * When this method is invoked, the SDK will invoke the operating system prompt to ask the user
     * to provide credentials.
     *
     * So no GUI must be explicitly defined by the code using the SDK (as required in the fingerprint
     * and the PIN authenticators).
     *
     * @param biometricOptions the options to be used when prompting.
     * @returns an {@link OsAuthenticationListenHandler} that can be used to cancel listening for OS
     * credentials.
     */
    abstract listenForOsCredentials(biometricOptions?: BiometricPromptOptions): Promise<OsAuthenticationListenHandler>;
}
export declare class BiometricUserVerificationHandlerImpl extends BiometricUserVerificationHandler {
    private readonly _operationId;
    private readonly _listenForOsCredentials;
    constructor(operationId: string);
    listenForOsCredentials(biometricOptions?: BiometricPromptOptions): Promise<OsAuthenticationListenHandler>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=BiometricUserVerificationHandler.d.ts.map