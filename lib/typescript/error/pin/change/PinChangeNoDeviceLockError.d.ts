/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinChangeDeviceProtectionError } from './PinChangeDeviceProtectionError';
/**
 * The device has no secure lock screen.
 */
export declare class PinChangeNoDeviceLockError extends PinChangeDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=PinChangeNoDeviceLockError.d.ts.map