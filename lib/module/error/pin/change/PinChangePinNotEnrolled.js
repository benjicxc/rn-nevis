/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeError } from './PinChangeError';

/**
 * The error that occurs when the specified user during a PIN change operation does not have an enrolled PIN.
 */
export class PinChangePinNotEnrolled extends PinChangeError {
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
//# sourceMappingURL=PinChangePinNotEnrolled.js.map