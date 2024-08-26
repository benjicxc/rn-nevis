"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadError = void 0;
var _OutOfBandOperationError = require("../operation/OutOfBandOperationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error returned when there is a problem with the out-of-band payload: it cannot be decrypted
 * or the provided JSON is not properly formatted.
 */
class OutOfBandPayloadError extends _OutOfBandOperationError.OutOfBandOperationError {}
exports.OutOfBandPayloadError = OutOfBandPayloadError;
//# sourceMappingURL=OutOfBandPayloadError.js.map