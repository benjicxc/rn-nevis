/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationError } from './AuthenticationError';
/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link AuthenticationNoDeviceLockError}.
 */
export class AuthenticationDeviceProtectionError extends AuthenticationError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The {@link SessionProvider} that can be used to continue with the operation.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
   */
  constructor(description, cause, sessionProvider) {
    super();
    this.description = description;
    this.cause = cause;
    this.sessionProvider = sessionProvider;
  }
}
//# sourceMappingURL=AuthenticationDeviceProtectionError.js.map