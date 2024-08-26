/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Account } from '../../../localData/Account';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the local accounts native event.
 */
export class LocalAccountsMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The list of the registered accounts.
   */

  /**
   * Default constructor for {@link LocalAccountsMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param accounts the list of the registered accounts.
   */
  constructor(operationId, accounts) {
    super();
    this.operationId = operationId;
    this.accounts = accounts;
  }

  /**
   * Alternate constructor that creates a {@link LocalAccountsMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const data = json.accounts;
    const accounts = data.map(account => Account.fromJson(account));
    return new LocalAccountsMessage(operationId, accounts);
  }
}
//# sourceMappingURL=LocalAccountsMessage.js.map