/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the operation type native event.
 */
export class OperationTypeMessage extends ChannelMessage {
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
//# sourceMappingURL=OperationTypeMessage.js.map