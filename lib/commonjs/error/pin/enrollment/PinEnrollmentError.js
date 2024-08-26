"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollmentError = void 0;
var _RecoverableError = require("../../RecoverableError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that informs that an error occurred during PIN enrollment.
 *
 * Currently, this is always a {@link PinEnrollmentInvalidPinFormat}.
 */
class PinEnrollmentError extends _RecoverableError.RecoverableError {}
exports.PinEnrollmentError = PinEnrollmentError;
//# sourceMappingURL=PinEnrollmentError.js.map