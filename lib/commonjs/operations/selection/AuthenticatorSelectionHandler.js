"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticatorSelectionHandlerImpl = exports.AuthenticatorSelectionHandler = void 0;
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _AuthenticatorAaidMessage = require("../../model/messages/out/AuthenticatorAaidMessage");
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _CancellableHandler = require("../CancellableHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user chooses the authenticator to
 * be used.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
class AuthenticatorSelectionHandler extends _CancellableHandler.CancellableHandler {}
exports.AuthenticatorSelectionHandler = AuthenticatorSelectionHandler;
class AuthenticatorSelectionHandlerImpl extends AuthenticatorSelectionHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async aaid(aaid) {
    const message = new _AuthenticatorAaidMessage.AuthenticatorAaidMessage(this._operationId, aaid);
    return _MobileAuthenticationSdk.default.authenticatorAaid(message);
  }
  async cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.AuthenticatorSelectionHandlerImpl = AuthenticatorSelectionHandlerImpl;
//# sourceMappingURL=AuthenticatorSelectionHandler.js.map