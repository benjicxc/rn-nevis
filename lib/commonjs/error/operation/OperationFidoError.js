"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationFidoError = void 0;
var _OperationError = require("./OperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error that indicates that a FIDO UAF error occurred during an operation.
 */
class OperationFidoError extends _OperationError.OperationError {
  /**
   * The FIDO UAF error that occurred.
   */

  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The default constructor.
   *
   * @param errorCode the FIDO UAF error that occurred.
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(errorCode, description, cause) {
    super();
    this.errorCode = errorCode;
    this.description = description;
    this.cause = cause;
  }
}
exports.OperationFidoError = OperationFidoError;
//# sourceMappingURL=OperationFidoError.js.map