"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeNoDeviceLockError = void 0;
var _PinChangeDeviceProtectionError = require("./PinChangeDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device has no secure lock screen.
 */
class PinChangeNoDeviceLockError extends _PinChangeDeviceProtectionError.PinChangeDeviceProtectionError {
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
exports.PinChangeNoDeviceLockError = PinChangeNoDeviceLockError;
//# sourceMappingURL=PinChangeNoDeviceLockError.js.map