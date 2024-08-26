"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangePinLocked = void 0;
var _PinChangeError = require("./PinChangeError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error that occurs when the PIN was locked because of too many failures.
 */
class PinChangePinLocked extends _PinChangeError.PinChangeError {
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
exports.PinChangePinLocked = PinChangePinLocked;
//# sourceMappingURL=PinChangePinLocked.js.map