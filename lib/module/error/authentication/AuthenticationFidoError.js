/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationError } from './AuthenticationError';
/**
 * An error that indicates that a FIDO UAF error occurred during an operation.
 */
export class AuthenticationFidoError extends AuthenticationError {
  /**
   * The FIDO UAF error that occurred.
   */

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
   * @param errorCode the FIDO UAF error that occurred.
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
   */
  constructor(errorCode, description, cause, sessionProvider) {
    super();
    this.errorCode = errorCode;
    this.description = description;
    this.cause = cause;
    this.sessionProvider = sessionProvider;
  }
}
//# sourceMappingURL=AuthenticationFidoError.js.map