"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationUserNotRegisteredInServerError = void 0;
var _OperationError = require("./OperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error that occurs with username-less out-of-band authentication, if the username of a registered
 * account is provided to the {@link AccountSelectionHandler}, but the user is not defined in the server
 * where the token was redeemed.
 */
class OperationUserNotRegisteredInServerError extends _OperationError.OperationError {
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
exports.OperationUserNotRegisteredInServerError = OperationUserNotRegisteredInServerError;
//# sourceMappingURL=OperationUserNotRegisteredInServerError.js.map