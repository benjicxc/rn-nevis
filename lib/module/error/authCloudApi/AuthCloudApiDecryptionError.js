/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiError } from './AuthCloudApiError';

/**
 * The encrypted contents of the Auth Cloud API response could not be decrypted.
 *
 * This occurs for instance when the keys that are used to decrypt the Auth Cloud API response are deleted.
 */
export class AuthCloudApiDecryptionError extends AuthCloudApiError {
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
//# sourceMappingURL=AuthCloudApiDecryptionError.js.map