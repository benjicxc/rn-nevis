"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadDecodeImpl = exports.OutOfBandPayloadDecode = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _UserInteractionPlatformOperation = require("../../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../../cache/PlatformOperationCache");
var _OutOfBandPayloadErrorConverter = require("../../error/outOfBand/payload/OutOfBandPayloadErrorConverter");
var _NativeEventListener = require("../../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OnSuccessMessage = require("../../model/messages/in/OnSuccessMessage");
var _OutOfBandPayloadDecodeMessage = require("../../model/messages/out/OutOfBandPayloadDecodeMessage");
var _Operation = require("../Operation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object that decodes an {@link OutOfBandPayload} from a string in JSON format or a Base64 URL
 * encoded string representing the JSON.
 *
 * The {@link OutOfBandPayload} can be used to trigger an out-of-band operation (see {@link OutOfBandOperation}).
 *
 * Usage example:
 * ```ts
 * [...]
 *   async decodeOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       json: string
 *   ): Promise<void> {
 *       await client.operations.outOfBandPayloadDecode
 *           .json(json)
 *           .onSuccess((outOfBandPayload) => {
 *               // handle the OutOfBandPayload
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * The JSON is obtained from a push notification, or as a Base64 URL encoded JSON in QR codes generated
 * by the server.
 * JSON example:
 * ```json
 * {
 *   "nma_data" : {
 *     "token" : "b4b07559-f934-4597-a1c5-44d89f691e8f",
 *     "redeem_url" : "https://fido.siven.ch/nevisfido/token/redeem/authentication",
 *     "attributeName" : "some additional data to be included in the QR code"
 *   },
 *   "nma_data_content_type" : "application/json",
 *   "nma_data_version" : "1"
 * }
 */
class OutOfBandPayloadDecode extends _Operation.Operation {}
exports.OutOfBandPayloadDecode = OutOfBandPayloadDecode;
class OutOfBandPayloadDecodeImpl extends OutOfBandPayloadDecode {
  json(json) {
    this._json = json;
    return this;
  }
  base64UrlEncoded(base64UrlEncoded) {
    this._base64UrlEncoded = base64UrlEncoded;
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
    const message = new _OutOfBandPayloadDecodeMessage.OutOfBandPayloadDecodeMessage(operationId, this._onSuccess !== undefined, this.onError !== undefined, this._json, this._base64UrlEncoded);
    function finish() {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(operationId);
    }
    return _MobileAuthenticationSdk.default.payloadDecode(message).then(result => {
      var _this$_onSuccess;
      finish();
      const successMessage = _OnSuccessMessage.OnSuccessMessage.fromJson(result);
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this, successMessage.outOfBandPayload);
    }).catch(error => {
      var _this$_onError;
      finish();
      const payloadError = new _OutOfBandPayloadErrorConverter.OutOfBandPayloadErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, payloadError);
    });
  }
}
exports.OutOfBandPayloadDecodeImpl = OutOfBandPayloadDecodeImpl;
//# sourceMappingURL=OutOfBandPayloadDecode.js.map