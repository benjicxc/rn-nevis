/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the policy compliant call.
 */
export class IsPolicyCompliantMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The aaid of the {@link Authenticator}.
   */

  /**
   * The username of the account.
   */

  /**
   *
   * @param operationId the identifier of the operation.
   * @param aaid the aaid of the {@link Authenticator}.
   * @param username the username of the account.
   */
  constructor(operationId, aaid, username) {
    super();
    this.operationId = operationId;
    this.aaid = aaid;
    this.username = username;
  }
}
//# sourceMappingURL=IsPolicyCompliantMessage.js.map