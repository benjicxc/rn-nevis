/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AccountSelectionContext } from '../../../operations/selection/AccountSelectionContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the select account native event.
 */
export class SelectAccountMessage extends ChannelMessage {
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
    const context = AccountSelectionContext.fromJson(json.context);
    return new SelectAccountMessage(operationId, context);
  }
}
//# sourceMappingURL=SelectAccountMessage.js.map