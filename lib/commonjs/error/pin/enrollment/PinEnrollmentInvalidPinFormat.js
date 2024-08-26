"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollmentInvalidPinFormat = void 0;
var _PinEnrollmentError = require("./PinEnrollmentError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The provided PIN is not compliant with the {@link PinPolicy}.
 */
class PinEnrollmentInvalidPinFormat extends _PinEnrollmentError.PinEnrollmentError {
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
exports.PinEnrollmentInvalidPinFormat = PinEnrollmentInvalidPinFormat;
//# sourceMappingURL=PinEnrollmentInvalidPinFormat.js.map