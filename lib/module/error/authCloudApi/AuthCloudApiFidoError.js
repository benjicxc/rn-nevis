/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiError } from './AuthCloudApiError';
/**
 * An error that indicates that a FIDO UAF error occurred during an operation.
 */
export class AuthCloudApiFidoError extends AuthCloudApiError {
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
   * The default constructor.
   *
   * @param errorCode the FIDO UAF error that occurred.
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(errorCode, description, cause) {
    super();
    this.errorCode = errorCode;
    this.description = description;
    this.cause = cause;
  }
}
//# sourceMappingURL=AuthCloudApiFidoError.js.map