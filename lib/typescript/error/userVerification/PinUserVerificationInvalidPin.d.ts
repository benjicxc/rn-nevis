/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinUserVerificationError } from './PinUserVerificationError';
/**
 * The error that occurs when the user provides a bad PIN.
 */
export declare class PinUserVerificationInvalidPin extends PinUserVerificationError {
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
//# sourceMappingURL=PinUserVerificationInvalidPin.d.ts.map