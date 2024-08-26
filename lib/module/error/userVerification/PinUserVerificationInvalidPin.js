/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinUserVerificationError } from './PinUserVerificationError';

/**
 * The error that occurs when the user provides a bad PIN.
 */
export class PinUserVerificationInvalidPin extends PinUserVerificationError {
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
//# sourceMappingURL=PinUserVerificationInvalidPin.js.map