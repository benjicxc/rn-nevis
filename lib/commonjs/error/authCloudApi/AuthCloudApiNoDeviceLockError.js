"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCloudApiNoDeviceLockError = void 0;
var _AuthCloudApiDeviceProtectionError = require("./AuthCloudApiDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device has no secure lock screen.
 */
class AuthCloudApiNoDeviceLockError extends _AuthCloudApiDeviceProtectionError.AuthCloudApiDeviceProtectionError {
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
exports.AuthCloudApiNoDeviceLockError = AuthCloudApiNoDeviceLockError;
//# sourceMappingURL=AuthCloudApiNoDeviceLockError.js.map