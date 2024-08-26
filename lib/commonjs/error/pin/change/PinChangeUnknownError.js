"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeUnknownError = void 0;
var _PinChangeError = require("./PinChangeError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown PIN change error, handling not categorized error cases.
 */
class PinChangeUnknownError extends _PinChangeError.PinChangeError {
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
exports.PinChangeUnknownError = PinChangeUnknownError;
//# sourceMappingURL=PinChangeUnknownError.js.map