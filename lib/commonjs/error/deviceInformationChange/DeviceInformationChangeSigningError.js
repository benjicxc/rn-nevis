"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceInformationChangeSigningError = void 0;
var _DeviceInformationChangeError = require("./DeviceInformationChangeError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error occurred signing the update device information request.
 */
class DeviceInformationChangeSigningError extends _DeviceInformationChangeError.DeviceInformationChangeError {
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
exports.DeviceInformationChangeSigningError = DeviceInformationChangeSigningError;
//# sourceMappingURL=DeviceInformationChangeSigningError.js.map