/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticatorSelectionContext } from '../../../operations/selection/AuthenticatorSelectionContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the select authenticator native event.
 */
export class SelectAuthenticatorMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The authenticator selection context.
   */

  /**
   * Default constructor for {@link SelectAuthenticatorMessage}.
   *
   * @param operationId the identifier of operation.
   * @param context the authenticator selection context.
   */
  constructor(operationId, context) {
    super();
    this.operationId = operationId;
    this.context = context;
  }

  /**
   * Alternate constructor that creates a {@link SelectAuthenticatorMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const context = AuthenticatorSelectionContext.fromJson(json.context);
    return new SelectAuthenticatorMessage(operationId, context);
  }
}
//# sourceMappingURL=SelectAuthenticatorMessage.js.map