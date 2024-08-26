"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCloudApiDeviceProtectionError = void 0;
var _AuthCloudApiError = require("./AuthCloudApiError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link AuthCloudApiNoDeviceLockError}.
 */
class AuthCloudApiDeviceProtectionError extends _AuthCloudApiError.AuthCloudApiError {
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
exports.AuthCloudApiDeviceProtectionError = AuthCloudApiDeviceProtectionError;
//# sourceMappingURL=AuthCloudApiDeviceProtectionError.js.map