"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationTypeMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the operation type native event.
 */
class OperationTypeMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The type of the out-of-band operation.
   */

  /**
   * Default constructor for {@link OperationTypeMessage}.
   *
   * @param operationId the identifier of operation.
   * @param operationType the type of the out-of-band operation.
   */
  constructor(operationId, operationType) {
    super();
    this.operationId = operationId;
    this.operationType = operationType;
  }

  /**
   * Alternate constructor that creates an {@link OperationTypeMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    return new OperationTypeMessage(json.operationId, json.operationType);
  }
}
exports.OperationTypeMessage = OperationTypeMessage;
//# sourceMappingURL=OperationTypeMessage.js.map