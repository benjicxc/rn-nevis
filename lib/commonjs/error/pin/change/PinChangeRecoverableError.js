"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeRecoverableError = void 0;
var _RecoverableError = require("../../RecoverableError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The recoverable error that can occur when changing a PIN. When this error
 * occurs, the {@link PinChanger.changePin} method will be invoked again.
 * This error will be returned by the {@link PinChangeContext.lastRecoverableError}.
 */
class PinChangeRecoverableError extends _RecoverableError.RecoverableError {}
exports.PinChangeRecoverableError = PinChangeRecoverableError;
//# sourceMappingURL=PinChangeRecoverableError.js.map