/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationDeviceProtectionError } from './AuthenticationDeviceProtectionError';
/**
 * The device has no secure lock screen.
 */
export class AuthenticationNoDeviceLockError extends AuthenticationDeviceProtectionError {
  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
   */
  constructor(description, cause, sessionProvider) {
    super(description, cause, sessionProvider);
  }
}
//# sourceMappingURL=AuthenticationNoDeviceLockError.js.map