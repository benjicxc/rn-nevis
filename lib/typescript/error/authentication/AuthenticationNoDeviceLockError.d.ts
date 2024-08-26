/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthenticationDeviceProtectionError } from './AuthenticationDeviceProtectionError';
import { SessionProvider } from '../../authorization/SessionProvider';
/**
 * The device has no secure lock screen.
 */
export declare class AuthenticationNoDeviceLockError extends AuthenticationDeviceProtectionError {
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
     */
    constructor(description: string, cause?: string, sessionProvider?: SessionProvider);
}
//# sourceMappingURL=AuthenticationNoDeviceLockError.d.ts.map