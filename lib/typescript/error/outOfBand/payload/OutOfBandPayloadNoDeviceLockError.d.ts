/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OutOfBandPayloadDeviceProtectionError } from './OutOfBandPayloadDeviceProtectionError';
/**
 * The device has no secure lock screen.
 */
export declare class OutOfBandPayloadNoDeviceLockError extends OutOfBandPayloadDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=OutOfBandPayloadNoDeviceLockError.d.ts.map