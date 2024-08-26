"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinUserVerificationHandlerImpl = exports.PinUserVerificationHandler = void 0;
var _UserVerificationHandler = require("./UserVerificationHandler");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _PinVerificationMessage = require("../../model/messages/out/PinVerificationMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user provides
 * PIN credentials.
 *
 * This is used with the {@link Aaid.PIN} authenticator attestation identifier.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
class PinUserVerificationHandler extends _UserVerificationHandler.UserVerificationHandler {}
exports.PinUserVerificationHandler = PinUserVerificationHandler;
class PinUserVerificationHandlerImpl extends PinUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async verifyPin(pin) {
    const message = new _PinVerificationMessage.PinVerificationMessage(this._operationId, pin);
    return _MobileAuthenticationSdk.default.pinVerify(message);
  }
  async cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.PinUserVerificationHandlerImpl = PinUserVerificationHandlerImpl;
//# sourceMappingURL=PinUserVerificationHandler.js.map