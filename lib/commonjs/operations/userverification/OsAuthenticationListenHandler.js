"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OsAuthenticationListenHandlerImpl = exports.OsAuthenticationListenHandler = void 0;
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An object that can be used to resume listening for OS credentials (i.e. fingerprint, face recognition)
 * and to cancel the whole operation while listening for credentials.
 *
 * This is used with {@link Aaid.BIOMETRIC}, {@link Aaid.DEVICE_PASSCODE} and {@link Aaid.FINGERPRINT}
 * authenticator attestation identifier.
 *
 * @see
 * - {@link BiometricUserVerificationHandler.listenForOsCredentials}
 * - {@link FingerprintUserVerificationHandler.listenForOsCredentials}
 */
class OsAuthenticationListenHandler {}
exports.OsAuthenticationListenHandler = OsAuthenticationListenHandler;
class OsAuthenticationListenHandlerImpl extends OsAuthenticationListenHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async cancelAuthentication() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancelAuthentication(message);
  }
  async pauseListening() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.pauseListening(message).then(() => {
      return this;
    });
  }
  async resumeListening() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.resumeListening(message).then(() => {
      return this;
    });
  }
}
exports.OsAuthenticationListenHandlerImpl = OsAuthenticationListenHandlerImpl;
//# sourceMappingURL=OsAuthenticationListenHandler.js.map