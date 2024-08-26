"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeregistrationImpl = exports.Deregistration = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _HttpOperation = require("./HttpOperation");
var _UserInteractionPlatformOperation = require("../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../cache/PlatformOperationCache");
var _OperationErrorConverter = require("../error/operation/OperationErrorConverter");
var _NativeEventListener = require("../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../MobileAuthenticationSdk"));
var _DeregistrationMessage = require("../model/messages/out/DeregistrationMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that can be used to trigger a deregistration operation.
 *
 * Usage example:
 * ```ts
 *   [...]
 *   async deregister(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       aaid: string
 *   ): Promise<void> {
 *       await client.operations.deregistration
 *           .username(username)
 *           .aaid(aaid)
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *   }
 *   [...]
 * ```
 */
class Deregistration extends _HttpOperation.HttpOperation {}
exports.Deregistration = Deregistration;
class DeregistrationImpl extends _HttpOperation.HttpOperationImpl {
  aaid(aaid) {
    this._aaid = aaid;
    return this;
  }
  username(username) {
    this._username = username;
    return this;
  }
  authorizationProvider(authorizationProvider) {
    this._authorizationProvider = authorizationProvider;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  onSuccess(onSuccess) {
    this._onSuccess = onSuccess;
    return this;
  }
  async execute() {
    const operationId = _reactNativeUuid.default.v4();
    const operation = new _UserInteractionPlatformOperation.UserInteractionPlatformOperationImpl(operationId);
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    _NativeEventListener.NativeEventListener.getInstance().start();
    const message = new _DeregistrationMessage.DeregistrationMessage(operationId, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._authorizationProvider, this._username, this._aaid);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.deregister(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const operationError = new _OperationErrorConverter.OperationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, operationError);
    });
  }
}
exports.DeregistrationImpl = DeregistrationImpl;
//# sourceMappingURL=Deregistration.js.map