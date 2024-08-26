"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationNetworkError = void 0;
var _OperationError = require("./OperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
class OperationNetworkError extends _OperationError.OperationError {
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
exports.OperationNetworkError = OperationNetworkError;
//# sourceMappingURL=OperationNetworkError.js.map