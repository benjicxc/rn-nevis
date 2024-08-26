/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeError } from './PinChangeError';

/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always a {@link PinChangeNoDeviceLockError}.
 */
export class PinChangeDeviceProtectionError extends PinChangeError {
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
//# sourceMappingURL=PinChangeDeviceProtectionError.js.map