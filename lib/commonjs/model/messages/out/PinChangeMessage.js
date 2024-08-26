"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeMessage = void 0;
var _OperationMessage = require("./OperationMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the PIN change operation call.
 */
class PinChangeMessage extends _OperationMessage.OperationMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Flag that tells whether the PIN changer is provided.
   */

  /**
   * The username.
   */

  /**
   * Specifies the PIN policy to be used.
   */

  /**
   * Flag that tells whether the success callback is provided.
   */

  /**
   * Flag that tells whether the error callback is provided.
   */

  constructor(operationId, pinChangerProvided, onSuccessProvided, onErrorProvided, username, pinPolicy) {
    super();
    this.operationId = operationId;
    this.username = username;
    this.pinPolicy = pinPolicy;
    this.pinChangerProvided = pinChangerProvided;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
  }
}
exports.PinChangeMessage = PinChangeMessage;
//# sourceMappingURL=PinChangeMessage.js.map