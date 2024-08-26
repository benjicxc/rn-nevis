"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceInformationChangeNameAlreadyExists = void 0;
var _DeviceInformationChangeError = require("./DeviceInformationChangeError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * There is already a device information with the provided name. All the device information names
 * of a given user must be unique.
 */
class DeviceInformationChangeNameAlreadyExists extends _DeviceInformationChangeError.DeviceInformationChangeError {
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
exports.DeviceInformationChangeNameAlreadyExists = DeviceInformationChangeNameAlreadyExists;
//# sourceMappingURL=DeviceInformationChangeNameAlreadyExists.js.map