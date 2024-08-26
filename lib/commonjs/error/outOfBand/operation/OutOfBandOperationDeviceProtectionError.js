"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationDeviceProtectionError = void 0;
var _OutOfBandOperationError = require("./OutOfBandOperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link OutOfBandOperationNoDeviceLockError}.
 */
class OutOfBandOperationDeviceProtectionError extends _OutOfBandOperationError.OutOfBandOperationError {
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
exports.OutOfBandOperationDeviceProtectionError = OutOfBandOperationDeviceProtectionError;
//# sourceMappingURL=OutOfBandOperationDeviceProtectionError.js.map