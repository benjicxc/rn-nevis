/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';
/**
 * User has changed the lock screen configuration of the device and the credentials were created using an SDK
 * previous to 1.7. The data no longer accessible. This happens for example when the user created fingerprint
 * credentials with an application using an SDK previous to 1.7 and the fingerprints were modified. On credentials
 * created with an SDK 1.7 or later, changing the screen lock protection does not result in this error.
 */
export declare class InitializationLockScreenHasChangedError extends InitializationDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=InitializationLockScreenHasChangedError.d.ts.map