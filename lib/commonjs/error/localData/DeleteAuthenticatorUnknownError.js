"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAuthenticatorUnknownError = void 0;
var _DeleteAuthenticatorError = require("./DeleteAuthenticatorError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown error, handling not categorized error cases.
 */
class DeleteAuthenticatorUnknownError extends _DeleteAuthenticatorError.DeleteAuthenticatorError {
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
exports.DeleteAuthenticatorUnknownError = DeleteAuthenticatorUnknownError;
//# sourceMappingURL=DeleteAuthenticatorUnknownError.js.map