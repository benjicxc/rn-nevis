"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeUserCanceled = void 0;
var _PinChangeError = require("./PinChangeError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error that occurs when the PIN change was canceled.
 */
class PinChangeUserCanceled extends _PinChangeError.PinChangeError {
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
exports.PinChangeUserCanceled = PinChangeUserCanceled;
//# sourceMappingURL=PinChangeUserCanceled.js.map