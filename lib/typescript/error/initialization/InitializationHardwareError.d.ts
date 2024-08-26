/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';
/**
 * Secure hardware is not available on this device or an error occurred checking the hardware of the device.
 */
export declare class InitializationHardwareError extends InitializationDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=InitializationHardwareError.d.ts.map