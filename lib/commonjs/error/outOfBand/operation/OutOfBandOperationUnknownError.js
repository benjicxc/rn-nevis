"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationUnknownError = void 0;
var _OutOfBandOperationError = require("./OutOfBandOperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown operation error, handling not categorized error cases.
 */
class OutOfBandOperationUnknownError extends _OutOfBandOperationError.OutOfBandOperationError {
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
exports.OutOfBandOperationUnknownError = OutOfBandOperationUnknownError;
//# sourceMappingURL=OutOfBandOperationUnknownError.js.map