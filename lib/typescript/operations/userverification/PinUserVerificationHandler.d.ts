/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { UserVerificationHandler } from './UserVerificationHandler';
/**
 * The objects consuming the outcome of an interaction where the user provides
 * PIN credentials.
 *
 * This is used with the {@link Aaid.PIN} authenticator attestation identifier.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
export declare abstract class PinUserVerificationHandler extends UserVerificationHandler {
    /**
     * The method to be invoked when the PIN authenticator must be used.
     *
     * The SDK will verify that the provided PIN is valid.
     * @param pin the PIN.
     */
    abstract verifyPin(pin: string): Promise<void>;
}
export declare class PinUserVerificationHandlerImpl extends PinUserVerificationHandler {
    private readonly _operationId;
    constructor(operationId: string);
    verifyPin(pin: string): Promise<void>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=PinUserVerificationHandler.d.ts.map