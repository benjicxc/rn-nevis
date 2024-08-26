/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationError } from './AuthenticationError';
/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
export class AuthenticationNetworkError extends AuthenticationError {
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
//# sourceMappingURL=AuthenticationNetworkError.js.map