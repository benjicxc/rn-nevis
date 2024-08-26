/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinChangeRecoverableError } from './PinChangeRecoverableError';
/**
 * The old and new PINs are equal. The new PIN must be different from the old PIN.
 */
export declare class PinChangeRecoverableOldPinEqualsNewPin extends PinChangeRecoverableError {
    /**
     * Provides details about the error that occurred.
     */
    description: string;
    /**
     * The exception (if any) that caused this error.
     */
    cause?: string;
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=PinChangeRecoverableOldPinEqualsNewPin.d.ts.map