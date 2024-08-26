"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationImpl = exports.Authentication = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _HttpOperation = require("./HttpOperation");
var _UserInteractionPlatformOperation = require("../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../cache/PlatformOperationCache");
var _AuthenticationErrorConverter = require("../error/authentication/AuthenticationErrorConverter");
var _NativeEventListener = require("../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../MobileAuthenticationSdk"));
var _OnSuccessMessage = require("../model/messages/in/OnSuccessMessage");
var _AuthenticationMessage = require("../model/messages/out/AuthenticationMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that can be used to trigger an authentication operation.
 *
 * Usage example:
 * ```ts
 *  class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *      async selectAuthenticator(
 *          context: AuthenticatorSelectionContext,
 *          handler: AuthenticatorSelectionHandler,
 *      ): Promise<void> {
 *          await handler.aaid(aaid).catch(console.error);
 *      }
 *  }
 *
 *  class PinUserVerifierImpl extends PinUserVerifier {
 *      async verifyPin(
 *          context: PinUserVerificationContext,
 *          handler: PinUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyPin(pin).catch(console.error);
 *      }
 *  }
 *
 *  class BiometricUserVerifierImpl implements BiometricUserVerifier {
 *      async verifyBiometric(
 *          context: BiometricUserVerificationContext,
 *          handler: BiometricUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyBiometric().catch(console.error);
 *      }
 *  }
 *
 *  [...]
 *  async function authenticate(
 *      client: MobileAuthenticationClient,
 *      username: string,
 *      sessionProvider?: SessionProvider,
 *  ): Promise<void> {
 *      await client.operations.authentication
 *          .username(username)
 *          .sessionProvider(sessionProvider)
 *          .authenticatorSelector(AuthenticatorSelectorImpl(...))
 *          .pinUserVerifier(PinUserVerifierImpl(...))
 *          .biometricUserVerifier(BiometricUserVerifierImpl(...))
 *          .onSuccess((authorizationProvider) {
 *              // handle success
 *          })
 *          .onError((error) {
 *              // handle error
 *          })
 *          .execute();
 *  }
 *  [...]
 * ```
 */
class Authentication extends _HttpOperation.HttpOperation {}
exports.Authentication = Authentication;
class AuthenticationImpl extends _HttpOperation.HttpOperationImpl {
  username(username) {
    this._username = username;
    return this;
  }
  sessionProvider(sessionProvider) {
    this._sessionProvider = sessionProvider;
    return this;
  }
  retryPolicyObtainingAuthorizationProvider(retryPolicy) {
    this._retryPolicyObtainingAuthorizationProvider = retryPolicy;
    return this;
  }
  authenticatorSelector(authenticatorSelector) {
    this._authenticatorSelector = authenticatorSelector;
    return this;
  }
  pinUserVerifier(pinUserVerifier) {
    this._pinUserVerifier = pinUserVerifier;
    return this;
  }
  biometricUserVerifier(biometricUserVerifier) {
    this._biometricUserVerifier = biometricUserVerifier;
    return this;
  }
  devicePasscodeUserVerifier(devicePasscodeUserVerifier) {
    this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
    return this;
  }
  fingerprintUserVerifier(fingerprintUserVerifier) {
    this._fingerprintUserVerifier = fingerprintUserVerifier;
    return this;
  }
  onSuccess(onSuccess) {
    this._onSuccess = onSuccess;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  async execute() {
    const operationId = _reactNativeUuid.default.v4();
    const operation = new _UserInteractionPlatformOperation.UserInteractionPlatformOperationImpl(operationId, this._authenticatorSelector, undefined, this._biometricUserVerifier, this._devicePasscodeUserVerifier, this._fingerprintUserVerifier, this._pinUserVerifier, undefined, undefined);
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    _NativeEventListener.NativeEventListener.getInstance().start();
    const message = new _AuthenticationMessage.AuthenticationMessage(operationId, this._authenticatorSelector !== undefined, this._pinUserVerifier !== undefined, this._biometricUserVerifier !== undefined, this._devicePasscodeUserVerifier !== undefined, this._fingerprintUserVerifier !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this._username, this._sessionProvider, this._retryPolicyObtainingAuthorizationProvider, this.httpRequestHeaders);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.authenticate(message).then(result => {
      var _this$_onSuccess;
      finish();
      const successMessage = _OnSuccessMessage.OnSuccessMessage.fromJson(result);
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this, successMessage.authorizationProvider);
    }).catch(error => {
      var _this$_onError;
      finish();
      const authenticationError = new _AuthenticationErrorConverter.AuthenticationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, authenticationError);
    });
  }
}
exports.AuthenticationImpl = AuthenticationImpl;
//# sourceMappingURL=Authentication.js.map