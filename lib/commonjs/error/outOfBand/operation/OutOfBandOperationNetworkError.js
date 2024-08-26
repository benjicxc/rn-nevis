"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationNetworkError = void 0;
var _OutOfBandOperationError = require("./OutOfBandOperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
class OutOfBandOperationNetworkError extends _OutOfBandOperationError.OutOfBandOperationError {
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
exports.OutOfBandOperationNetworkError = OutOfBandOperationNetworkError;
//# sourceMappingURL=OutOfBandOperationNetworkError.js.map