/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationError } from './OperationError';

/**
 * Unknown error, handling not categorized error cases.
 */
export class OperationUnknownError extends OperationError {
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
//# sourceMappingURL=OperationUnknownError.js.map