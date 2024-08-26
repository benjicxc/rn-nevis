"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectAccountMessage = void 0;
var _AccountSelectionContext = require("../../../operations/selection/AccountSelectionContext");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the select account native event.
 */
class SelectAccountMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The returned account selection context.
   */

  /**
   * Default constructor for {@link SelectAccountMessage}.
   *
   * @param operationId the identifier of operation.
   * @param context the returned account selection context.
   */
  constructor(operationId, context) {
    super();
    this.operationId = operationId;
    this.context = context;
  }

  /**
   * Alternate constructor that creates an {@link SelectAccountMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link SelectAccountMessage}
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const context = _AccountSelectionContext.AccountSelectionContext.fromJson(json.context);
    return new SelectAccountMessage(operationId, context);
  }
}
exports.SelectAccountMessage = SelectAccountMessage;
//# sourceMappingURL=SelectAccountMessage.js.map