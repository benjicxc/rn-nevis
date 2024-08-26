"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationImpl = exports.OutOfBandOperation = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _OutOfBandAuthentication = require("./OutOfBandAuthentication");
var _OutOfBandRegistration = require("./OutOfBandRegistration");
var _OutOfBandPlatformOperation = require("../../cache/operation/OutOfBandPlatformOperation");
var _PlatformOperationCache = require("../../cache/PlatformOperationCache");
var _OutOfBandOperationErrorConverter = require("../../error/outOfBand/operation/OutOfBandOperationErrorConverter");
var _OutOfBandOperationUnknownError = require("../../error/outOfBand/operation/OutOfBandOperationUnknownError");
var _NativeEventListener = require("../../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OutOfBandOperationMessage = require("../../model/messages/out/OutOfBandOperationMessage");
var _HttpOperation = require("../HttpOperation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The operation managing an {@link OutOfBandPayload}.
 *
 * An {@link OutOfBandPayload} can be provided through different means:
 *   - a push notification,
 *   - a QR code or
 *   - an application link.
 *
 * This operation will process the payload, decrypt it if needed and send it to the server. If the
 * payload is successfully handled by the server, then the SDK will identify whether the operation
 * associated with the payload is a registration or an authentication. Depending on that the
 * {@link onRegistration} or the {@link onAuthentication} will be invoked.
 *
 * Usage example:
 * ```ts
 * [...]
 *   async authenticateUsingOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *       await client.operations.outOfBandOperation
 *           .payload(payload)
 *           .onRegistration((registration) => {
 *               // handle registration
 *           })
 *           .onAuthentication((authentication) => {
 *               // handle authentication
 *           })
 *           .onError((_error) => {
 *               // handle out-of-band error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * @see
 * - {@link OutOfBandPayload}
 * - {@link OutOfBandRegistration}
 * - {@link OutOfBandAuthentication}
 */
class OutOfBandOperation extends _HttpOperation.HttpOperation {}
exports.OutOfBandOperation = OutOfBandOperation;
class OutOfBandOperationImpl extends _HttpOperation.HttpOperationImpl {
  payload(payload) {
    this._payload = payload;
    return this;
  }
  onRegistration(onRegistration) {
    this._onRegistration = onRegistration;
    return this;
  }
  onAuthentication(onAuthentication) {
    this._onAuthentication = onAuthentication;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  async execute() {
    const operationId = _reactNativeUuid.default.v4();
    const subOperationId = _reactNativeUuid.default.v4();
    const onOperationType = type => {
      var _this$_onError;
      switch (type) {
        case _OutOfBandPlatformOperation.OutOfBandPlatformOperationType.registration:
          {
            var _this$_onRegistration;
            const registration = new _OutOfBandRegistration.OutOfBandRegistrationImpl(subOperationId);
            (_this$_onRegistration = this._onRegistration) === null || _this$_onRegistration === void 0 || _this$_onRegistration.call(this, registration);
            break;
          }
        case _OutOfBandPlatformOperation.OutOfBandPlatformOperationType.authentication:
          {
            var _this$_onAuthenticati;
            const authentication = new _OutOfBandAuthentication.OutOfBandAuthenticationImpl(subOperationId);
            (_this$_onAuthenticati = this._onAuthentication) === null || _this$_onAuthenticati === void 0 || _this$_onAuthenticati.call(this, authentication);
            break;
          }
        default:
          (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, new _OutOfBandOperationUnknownError.OutOfBandOperationUnknownError(`Unsupported out-of-band operation type (${type}).`));
      }
    };
    const operation = new _OutOfBandPlatformOperation.OutOfBandPlatformOperation(operationId, onOperationType);
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    _NativeEventListener.NativeEventListener.getInstance().start();
    const message = new _OutOfBandOperationMessage.OutOfBandOperationMessage(operationId, subOperationId, false, this.onError !== undefined, this.httpRequestHeaders, this._payload, this._onRegistration !== undefined, this._onAuthentication !== undefined);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.oobOperation(message).then(() => finish()).catch(error => {
      var _this$_onError2;
      finish();
      const operationError = new _OutOfBandOperationErrorConverter.OutOfBandOperationErrorConverter(error).convert();
      (_this$_onError2 = this._onError) === null || _this$_onError2 === void 0 || _this$_onError2.call(this, operationError);
    });
  }
}
exports.OutOfBandOperationImpl = OutOfBandOperationImpl;
//# sourceMappingURL=OutOfBandOperation.js.map