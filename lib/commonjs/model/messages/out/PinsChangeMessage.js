"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinsChangeMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the PIN change call.
 */
class PinsChangeMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The old pin.
   */

  /**
   * The new pin.
   */

  /**
   * Default constructor for {@link PinsChangeMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param oldPin the old pin.
   * @param newPin the new pin.
   */
  constructor(operationId, oldPin, newPin) {
    super();
    this.operationId = operationId;
    this.oldPin = oldPin;
    this.newPin = newPin;
  }
}
exports.PinsChangeMessage = PinsChangeMessage;
//# sourceMappingURL=PinsChangeMessage.js.map