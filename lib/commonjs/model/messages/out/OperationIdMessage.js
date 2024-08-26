"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationIdMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of an operation identifier based call.
 */
class OperationIdMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   */
  constructor(operationId) {
    super();
    this.operationId = operationId;
  }
}
exports.OperationIdMessage = OperationIdMessage;
//# sourceMappingURL=OperationIdMessage.js.map