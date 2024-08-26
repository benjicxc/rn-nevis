/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeRecoverableError } from './PinChangeRecoverableError';

/**
 * The old and new PINs are equal. The new PIN must be different from the old PIN.
 */
export class PinChangeRecoverableOldPinEqualsNewPin extends PinChangeRecoverableError {
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
//# sourceMappingURL=PinChangeRecoverableOldPinEqualsNewPin.js.map