"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangerMessage = void 0;
var _PinChangeContext = require("../../../operations/pin/PinChangeContext");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the change pin native event.
 */
class PinChangerMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The returned pin change context.
   */

  /**
   * Default constructor for {@link PinChangerMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param context the returned pin change context.
   * @private
   */
  constructor(operationId, context) {
    super();
    this.operationId = operationId;
    this.context = context;
  }

  /**
   * Alternate constructor that creates an {@link PinChangerMessage} from a json.
   *
   * @param json contains the source for instance creation.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const context = _PinChangeContext.PinChangeContext.fromJson(json.context);
    return new PinChangerMessage(operationId, context);
  }
}
exports.PinChangerMessage = PinChangerMessage;
//# sourceMappingURL=PinChangerMessage.js.map