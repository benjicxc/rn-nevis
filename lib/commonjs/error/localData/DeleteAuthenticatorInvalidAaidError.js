"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAuthenticatorInvalidAaidError = void 0;
var _DeleteAuthenticatorError = require("./DeleteAuthenticatorError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Invalid AAID were provided during authenticator deletion.
 */
class DeleteAuthenticatorInvalidAaidError extends _DeleteAuthenticatorError.DeleteAuthenticatorError {
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
exports.DeleteAuthenticatorInvalidAaidError = DeleteAuthenticatorInvalidAaidError;
//# sourceMappingURL=DeleteAuthenticatorInvalidAaidError.js.map