"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinUserVerificationError = void 0;
var _RecoverableError = require("../RecoverableError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The recoverable error that can occur when verifying the user with a PIN.
 *
 * When this error occurs, the {@link PinUserVerifier.verifyPin} method will be invoked again.
 * This error will be returned by the {@link PinUserVerificationContext.lastRecoverableError}.
 *
 * Currently, this is always a {@link PinUserVerificationInvalidPin}.
 */
class PinUserVerificationError extends _RecoverableError.RecoverableError {}
exports.PinUserVerificationError = PinUserVerificationError;
//# sourceMappingURL=PinUserVerificationError.js.map