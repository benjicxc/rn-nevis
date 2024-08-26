"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationHardwareError = void 0;
var _InitializationDeviceProtectionError = require("./InitializationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Secure hardware is not available on this device or an error occurred checking the hardware of the device.
 */
class InitializationHardwareError extends _InitializationDeviceProtectionError.InitializationDeviceProtectionError {
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
exports.InitializationHardwareError = InitializationHardwareError;
//# sourceMappingURL=InitializationHardwareError.js.map