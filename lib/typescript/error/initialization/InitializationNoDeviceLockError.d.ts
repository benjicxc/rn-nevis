/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';
/**
 * The error that occurs when the device has no secure lock screen during initialization.
 */
export declare class InitializationNoDeviceLockError extends InitializationDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=InitializationNoDeviceLockError.d.ts.map