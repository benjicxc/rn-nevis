"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeRecoverableOldPinEqualsNewPin = void 0;
var _PinChangeRecoverableError = require("./PinChangeRecoverableError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The old and new PINs are equal. The new PIN must be different from the old PIN.
 */
class PinChangeRecoverableOldPinEqualsNewPin extends _PinChangeRecoverableError.PinChangeRecoverableError {
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
exports.PinChangeRecoverableOldPinEqualsNewPin = PinChangeRecoverableOldPinEqualsNewPin;
//# sourceMappingURL=PinChangeRecoverableOldPinEqualsNewPin.js.map