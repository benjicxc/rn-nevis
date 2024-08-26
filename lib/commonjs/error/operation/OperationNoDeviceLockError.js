"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationNoDeviceLockError = void 0;
var _OperationDeviceProtectionError = require("./OperationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device has no secure lock screen.
 */
class OperationNoDeviceLockError extends _OperationDeviceProtectionError.OperationDeviceProtectionError {
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
exports.OperationNoDeviceLockError = OperationNoDeviceLockError;
//# sourceMappingURL=OperationNoDeviceLockError.js.map