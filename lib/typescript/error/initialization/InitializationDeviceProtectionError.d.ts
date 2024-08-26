/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { InitializationError } from './InitializationError';
/**
 * An error that indicates that some form of tampering was found in the application.
 */
export declare class InitializationDeviceProtectionError extends InitializationError {
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
//# sourceMappingURL=InitializationDeviceProtectionError.d.ts.map