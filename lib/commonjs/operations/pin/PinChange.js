"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeImpl = exports.PinChange = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _UserInteractionPlatformOperation = require("../../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../../cache/PlatformOperationCache");
var _PinChangeErrorConverter = require("../../error/pin/change/PinChangeErrorConverter");
var _NativeEventListener = require("../../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _PinChangeMessage = require("../../model/messages/out/PinChangeMessage");
var _Operation = require("../Operation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that can be used to change the PIN.
 *
 * Usage example:
 * ```ts
 * class PinChangerImpl implements PinChanger {
 *     async changePin(context: PinChangeContext, handler: PinChangeHandler) {
 *         handler.pins(oldPin, newPin);
 *     }
 * }
 *
 * [...]
 * async pinChange({
 *     client: MobileAuthenticationClient,
 *     username: string,
 * }): Promise<void> {
 *     await client.operations.pinChange
 *         .username(username)
 *         .pinChanger(PinChangerImpl(...))
 *         .onSuccess(() {
 *             // handle success
 *         })
 *         .onError((error) {
 *             // handle error
 *         })
 *         .execute();
 * }
 * [...]
 * ```
 */
class PinChange extends _Operation.Operation {}
exports.PinChange = PinChange;
class PinChangeImpl extends PinChange {
  username(username) {
    this._username = username;
    return this;
  }
  pinChanger(pinChanger) {
    this._pinChanger = pinChanger;
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
    var _this$_pinChanger;
    const operationId = _reactNativeUuid.default.v4();
    const operation = new _UserInteractionPlatformOperation.UserInteractionPlatformOperationImpl(operationId, undefined, undefined, undefined, undefined, undefined, undefined, this._pinChanger);
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    _NativeEventListener.NativeEventListener.getInstance().start();
    const message = new _PinChangeMessage.PinChangeMessage(operationId, this._pinChanger !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this._username, (_this$_pinChanger = this._pinChanger) === null || _this$_pinChanger === void 0 ? void 0 : _this$_pinChanger.pinPolicy);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.pinChange(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const pinChangeError = new _PinChangeErrorConverter.PinChangeErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, pinChangeError);
    });
  }
}
exports.PinChangeImpl = PinChangeImpl;
//# sourceMappingURL=PinChange.js.map