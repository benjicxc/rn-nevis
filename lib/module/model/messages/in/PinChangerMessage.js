/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeContext } from '../../../operations/pin/PinChangeContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the change pin native event.
 */
export class PinChangerMessage extends ChannelMessage {
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
    const context = PinChangeContext.fromJson(json.context);
    return new PinChangerMessage(operationId, context);
  }
}
//# sourceMappingURL=PinChangerMessage.js.map