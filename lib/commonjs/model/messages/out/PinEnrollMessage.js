"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the PIN enrollment call.
 */
class PinEnrollMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The pin.
   */

  /**
   * Default constructor for {@link PinEnrollMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param pin the pin.
   */
  constructor(operationId, pin) {
    super();
    this.operationId = operationId;
    this.pin = pin;
  }
}
exports.PinEnrollMessage = PinEnrollMessage;
//# sourceMappingURL=PinEnrollMessage.js.map