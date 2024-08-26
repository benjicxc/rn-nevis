"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BiometricUserVerificationHandlerImpl = exports.BiometricUserVerificationHandler = void 0;
var _OsAuthenticationListenHandler = require("./OsAuthenticationListenHandler");
var _UserVerificationHandler = require("./UserVerificationHandler");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _ListenForOsCredentialsMessage = require("../../model/messages/out/ListenForOsCredentialsMessage");
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _TypedPromptOptions = require("../../model/typed/TypedPromptOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user provides biometric credentials.
 *
 * This is used with the {@link Aaid.BIOMETRIC} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link BiometricUserVerifier.verifyBiometric}
 */
class BiometricUserVerificationHandler extends _UserVerificationHandler.UserVerificationHandler {}
exports.BiometricUserVerificationHandler = BiometricUserVerificationHandler;
class BiometricUserVerificationHandlerImpl extends BiometricUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
    this._listenForOsCredentials = new _OsAuthenticationListenHandler.OsAuthenticationListenHandlerImpl(operationId);
  }
  async listenForOsCredentials(biometricOptions) {
    const typedBiometricPromptOptions = new _TypedPromptOptions.TypedBiometricPromptOptions(biometricOptions);
    const message = new _ListenForOsCredentialsMessage.ListenForOsCredentialsMessage(this._operationId, typedBiometricPromptOptions);
    return _MobileAuthenticationSdk.default.listenForOsCredentials(message).then(() => {
      return this._listenForOsCredentials;
    });
  }
  async cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.BiometricUserVerificationHandlerImpl = BiometricUserVerificationHandlerImpl;
//# sourceMappingURL=BiometricUserVerificationHandler.js.map