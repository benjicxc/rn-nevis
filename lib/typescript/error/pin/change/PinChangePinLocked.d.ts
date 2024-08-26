/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinChangeError } from './PinChangeError';
/**
 * The error that occurs when the PIN was locked because of too many failures.
 */
export declare class PinChangePinLocked extends PinChangeError {
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
//# sourceMappingURL=PinChangePinLocked.d.ts.map