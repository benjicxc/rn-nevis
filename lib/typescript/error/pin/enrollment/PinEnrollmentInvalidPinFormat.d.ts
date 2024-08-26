/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinEnrollmentError } from './PinEnrollmentError';
/**
 * The provided PIN is not compliant with the {@link PinPolicy}.
 */
export declare class PinEnrollmentInvalidPinFormat extends PinEnrollmentError {
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
//# sourceMappingURL=PinEnrollmentInvalidPinFormat.d.ts.map