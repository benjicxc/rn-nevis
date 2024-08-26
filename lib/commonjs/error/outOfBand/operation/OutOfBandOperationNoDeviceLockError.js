"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationNoDeviceLockError = void 0;
var _OutOfBandOperationDeviceProtectionError = require("./OutOfBandOperationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device has no secure lock screen.
 */
class OutOfBandOperationNoDeviceLockError extends _OutOfBandOperationDeviceProtectionError.OutOfBandOperationDeviceProtectionError {
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
exports.OutOfBandOperationNoDeviceLockError = OutOfBandOperationNoDeviceLockError;
//# sourceMappingURL=OutOfBandOperationNoDeviceLockError.js.map