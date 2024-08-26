/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationDeviceProtectionError } from './OperationDeviceProtectionError';

/**
 * The device has no secure lock screen.
 */
export class OperationNoDeviceLockError extends OperationDeviceProtectionError {
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
//# sourceMappingURL=OperationNoDeviceLockError.js.map