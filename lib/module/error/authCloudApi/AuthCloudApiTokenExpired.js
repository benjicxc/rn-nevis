/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiError } from './AuthCloudApiError';

/**
 * The token has expired.
 */
export class AuthCloudApiTokenExpired extends AuthCloudApiError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super();
    this.description = description;
    this.cause = cause;
  }
}
//# sourceMappingURL=AuthCloudApiTokenExpired.js.map