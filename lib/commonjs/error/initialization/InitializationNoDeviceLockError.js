"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationNoDeviceLockError = void 0;
var _InitializationDeviceProtectionError = require("./InitializationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error that occurs when the device has no secure lock screen during initialization.
 */
class InitializationNoDeviceLockError extends _InitializationDeviceProtectionError.InitializationDeviceProtectionError {
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
exports.InitializationNoDeviceLockError = InitializationNoDeviceLockError;
//# sourceMappingURL=InitializationNoDeviceLockError.js.map