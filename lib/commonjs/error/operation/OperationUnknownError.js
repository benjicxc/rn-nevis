"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationUnknownError = void 0;
var _OperationError = require("./OperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown error, handling not categorized error cases.
 */
class OperationUnknownError extends _OperationError.OperationError {
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
exports.OperationUnknownError = OperationUnknownError;
//# sourceMappingURL=OperationUnknownError.js.map