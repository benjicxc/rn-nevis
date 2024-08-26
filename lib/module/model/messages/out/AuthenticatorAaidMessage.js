/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the authenticator selection call.
 */
export class AuthenticatorAaidMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The aaid of the {@link Authenticator}.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param aaid the aaid of the {@link Authenticator}.
   */
  constructor(operationId, aaid) {
    super();
    this.operationId = operationId;
    this.aaid = aaid;
  }
}
//# sourceMappingURL=AuthenticatorAaidMessage.js.map