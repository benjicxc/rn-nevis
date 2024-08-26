"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinVerificationMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the PIN verification call.
 */
class PinVerificationMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The PIN parameter of the call.
   */

  /**
   * Default constructor for {@VerifyPinMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param pin the PIN parameter of the call.
   */
  constructor(operationId, pin) {
    super();
    this.operationId = operationId;
    this.pin = pin;
  }
}
exports.PinVerificationMessage = PinVerificationMessage;
//# sourceMappingURL=PinVerificationMessage.js.map