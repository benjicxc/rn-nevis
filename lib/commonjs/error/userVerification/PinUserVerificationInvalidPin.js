"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinUserVerificationInvalidPin = void 0;
var _PinUserVerificationError = require("./PinUserVerificationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error that occurs when the user provides a bad PIN.
 */
class PinUserVerificationInvalidPin extends _PinUserVerificationError.PinUserVerificationError {
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
exports.PinUserVerificationInvalidPin = PinUserVerificationInvalidPin;
//# sourceMappingURL=PinUserVerificationInvalidPin.js.map