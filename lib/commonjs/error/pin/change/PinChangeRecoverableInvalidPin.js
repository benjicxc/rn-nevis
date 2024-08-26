"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeRecoverableInvalidPin = void 0;
var _PinChangeRecoverableError = require("./PinChangeRecoverableError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The provided old PIN is not valid.
 */
class PinChangeRecoverableInvalidPin extends _PinChangeRecoverableError.PinChangeRecoverableError {
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
exports.PinChangeRecoverableInvalidPin = PinChangeRecoverableInvalidPin;
//# sourceMappingURL=PinChangeRecoverableInvalidPin.js.map