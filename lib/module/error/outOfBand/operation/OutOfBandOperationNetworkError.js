/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandOperationError } from './OutOfBandOperationError';

/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
export class OutOfBandOperationNetworkError extends OutOfBandOperationError {
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
//# sourceMappingURL=OutOfBandOperationNetworkError.js.map