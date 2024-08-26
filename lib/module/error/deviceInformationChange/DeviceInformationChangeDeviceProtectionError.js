/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { DeviceInformationChangeError } from './DeviceInformationChangeError';

/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always a {@link DeviceInformationChangeNoDeviceLockError}.
 */
export class DeviceInformationChangeDeviceProtectionError extends DeviceInformationChangeError {
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
//# sourceMappingURL=DeviceInformationChangeDeviceProtectionError.js.map