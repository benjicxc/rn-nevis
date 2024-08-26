"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceInformationChangeImpl = exports.DeviceInformationChange = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _HttpOperation = require("./HttpOperation");
var _UserInteractionPlatformOperation = require("../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../cache/PlatformOperationCache");
var _DeviceInformationChangeErrorConverter = require("../error/deviceInformationChange/DeviceInformationChangeErrorConverter");
var _NativeEventListener = require("../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../MobileAuthenticationSdk"));
var _DeviceInformationChangeMessage = require("../model/messages/out/DeviceInformationChangeMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that changes the device information.
 *
 * The device information change can be used to
 *  - modify the name of the device and/or
 *  - modify its Firebase registration token or
 *  - disable push notifications.
 *
 * If neither {@link name} or {@link fcmRegistrationToken} are provided, the provided {@link onSuccess}
 * callback will be executed when {@link execute} is invoked.
 *
 * Usage example for changing device information:
 * ```ts
 *   [...]
 *   async updateDeviceInformation(
 *       client: MobileAuthenticationClient,
 *       newName: string,
 *       fcmToken: string
 *   ): Promise<void> {
 *       await client.operations.deviceInformationChange
 *           .name(newName)
 *           .fcmRegistrationToken(fcmToken)
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
class DeviceInformationChange extends _HttpOperation.HttpOperation {}
exports.DeviceInformationChange = DeviceInformationChange;
class DeviceInformationChangeImpl extends _HttpOperation.HttpOperationImpl {
  name(name) {
    this._name = name;
    return this;
  }
  fcmRegistrationToken(fcmRegistrationToken) {
    this._fcmRegistrationToken = fcmRegistrationToken;
    return this;
  }
  disablePushNotifications() {
    this._disablePushNotifications = true;
    return this;
  }
  retryPolicy(retryPolicy) {
    this._retryPolicy = retryPolicy;
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
    const operation = new _UserInteractionPlatformOperation.UserInteractionPlatformOperationImpl(operationId);
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    _NativeEventListener.NativeEventListener.getInstance().start();
    const message = new _DeviceInformationChangeMessage.DeviceInformationChangeMessage(operationId, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._name, this._fcmRegistrationToken, this._disablePushNotifications, this._retryPolicy);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.deviceInformationChange(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const deviceInformationChangeError = new _DeviceInformationChangeErrorConverter.DeviceInformationChangeErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, deviceInformationChangeError);
    });
  }
}
exports.DeviceInformationChangeImpl = DeviceInformationChangeImpl;
//# sourceMappingURL=DeviceInformationChange.js.map