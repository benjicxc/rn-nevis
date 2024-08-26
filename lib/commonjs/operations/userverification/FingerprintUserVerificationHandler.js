"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FingerprintUserVerificationHandlerImpl = exports.FingerprintUserVerificationHandler = void 0;
var _OsAuthenticationListenHandler = require("./OsAuthenticationListenHandler");
var _UserVerificationHandler = require("./UserVerificationHandler");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _ListenForOsCredentialsMessage = require("../../model/messages/out/ListenForOsCredentialsMessage");
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user provides fingerprint credentials.
 *
 * This is used with the {@link Aaid.FINGERPRINT} authenticator attestation identifier.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
class FingerprintUserVerificationHandler extends _UserVerificationHandler.UserVerificationHandler {}
exports.FingerprintUserVerificationHandler = FingerprintUserVerificationHandler;
class FingerprintUserVerificationHandlerImpl extends FingerprintUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
    this._listenForOsCredentials = new _OsAuthenticationListenHandler.OsAuthenticationListenHandlerImpl(operationId);
  }
  async listenForOsCredentials() {
    const message = new _ListenForOsCredentialsMessage.ListenForOsCredentialsMessage(this._operationId);
    return _MobileAuthenticationSdk.default.listenForOsCredentials(message).then(() => {
      return this._listenForOsCredentials;
    });
  }
  async cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.FingerprintUserVerificationHandlerImpl = FingerprintUserVerificationHandlerImpl;
//# sourceMappingURL=FingerprintUserVerificationHandler.js.map