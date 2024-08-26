"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadMalformedPayload = void 0;
var _OutOfBandPayloadError = require("./OutOfBandPayloadError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * A violation of the out-of-band payload (contents of {@link OutOfBandPayload} occurred. The
 * message was malformed.
 */
class OutOfBandPayloadMalformedPayload extends _OutOfBandPayloadError.OutOfBandPayloadError {
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
exports.OutOfBandPayloadMalformedPayload = OutOfBandPayloadMalformedPayload;
//# sourceMappingURL=OutOfBandPayloadMalformedPayload.js.map