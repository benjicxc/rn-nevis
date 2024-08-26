"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadUnknownError = void 0;
var _OutOfBandPayloadError = require("./OutOfBandPayloadError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown operation error, handling not categorized error cases.
 */
class OutOfBandPayloadUnknownError extends _OutOfBandPayloadError.OutOfBandPayloadError {
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
exports.OutOfBandPayloadUnknownError = OutOfBandPayloadUnknownError;
//# sourceMappingURL=OutOfBandPayloadUnknownError.js.map