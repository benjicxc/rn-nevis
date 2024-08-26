/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OutOfBandOperationError } from './OutOfBandOperationError';
/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link OutOfBandOperationNoDeviceLockError}.
 */
export declare class OutOfBandOperationDeviceProtectionError extends OutOfBandOperationError {
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
//# sourceMappingURL=OutOfBandOperationDeviceProtectionError.d.ts.map