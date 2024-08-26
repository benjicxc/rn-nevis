/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';

/**
 * The error that occurs when the device has no secure lock screen during initialization.
 */
export class InitializationNoDeviceLockError extends InitializationDeviceProtectionError {
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
//# sourceMappingURL=InitializationNoDeviceLockError.js.map