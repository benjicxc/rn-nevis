/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthCloudApiError } from './AuthCloudApiError';
/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link AuthCloudApiNoDeviceLockError}.
 */
export declare class AuthCloudApiDeviceProtectionError extends AuthCloudApiError {
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
//# sourceMappingURL=AuthCloudApiDeviceProtectionError.d.ts.map