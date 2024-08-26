/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinEnrollmentError } from './PinEnrollmentError';

/**
 * The provided PIN is not compliant with the {@link PinPolicy}.
 */
export class PinEnrollmentInvalidPinFormat extends PinEnrollmentError {
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
//# sourceMappingURL=PinEnrollmentInvalidPinFormat.js.map