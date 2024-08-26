/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinAuthenticatorProtectionStatus } from './PinAuthenticatorProtectionStatus';
import type { PinChangeRecoverableError } from '../../error/pin/change/PinChangeRecoverableError';
/**
 * The object providing some contextual information during PIN change.
 *
 * @see {@link PinChanger.changePin}
 */
export declare abstract class PinChangeContext {
    /**
     * The username whose PIN must be changed.
     */
    abstract username: string;
    /**
     * The object describing the PIN protection status (whether is locked, in
     * cool-down mode, etc.).
     */
    abstract authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;
    /**
     * The object describing the latest recoverable error (if any).
     */
    abstract lastRecoverableError?: PinChangeRecoverableError;
    /**
     * Alternate constructor that creates a {@link PinChangeContext} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created {@link PinChangeContext} instance.
     */
    static fromJson(json: any): PinChangeContext;
}
export declare class PinChangeContextImpl extends PinChangeContext {
    authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;
    lastRecoverableError?: PinChangeRecoverableError;
    username: string;
    private constructor();
    static fromJson(json: any): PinChangeContextImpl;
}
//# sourceMappingURL=PinChangeContext.d.ts.map