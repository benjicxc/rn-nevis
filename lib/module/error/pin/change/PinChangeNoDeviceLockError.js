/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeDeviceProtectionError } from './PinChangeDeviceProtectionError';

/**
 * The device has no secure lock screen.
 */
export class PinChangeNoDeviceLockError extends PinChangeDeviceProtectionError {
  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super(description, cause);
  }
}
//# sourceMappingURL=PinChangeNoDeviceLockError.js.map