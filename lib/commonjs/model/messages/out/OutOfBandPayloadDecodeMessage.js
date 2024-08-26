"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadDecodeMessage = void 0;
var _OperationMessage = require("./OperationMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the out-of-band payload decode operation call.
 */
class OutOfBandPayloadDecodeMessage extends _OperationMessage.OperationMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Flag that tells whether the success callback is provided.
   */

  /**
   * Flag that tells whether the error callback is provided.
   */

  /**
   * Specifies the JSON to be decoded.
   */

  /**
   * Specifies the JSON as Base64 URL encoded string to be decoded.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param json the JSON to be decoded.
   * @param base64UrlEncoded the JSON as Base64 URL encoded string to be decoded.
   */
  constructor(operationId, onSuccessProvided, onErrorProvided, json, base64UrlEncoded) {
    super();
    this.operationId = operationId;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    this.json = json;
    this.base64UrlEncoded = base64UrlEncoded;
  }
}
exports.OutOfBandPayloadDecodeMessage = OutOfBandPayloadDecodeMessage;
//# sourceMappingURL=OutOfBandPayloadDecodeMessage.js.map