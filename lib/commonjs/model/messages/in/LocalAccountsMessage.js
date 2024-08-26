"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalAccountsMessage = void 0;
var _Account = require("../../../localData/Account");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the local accounts native event.
 */
class LocalAccountsMessage extends _ChannelMessage.ChannelMessage {
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
    const accounts = data.map(account => _Account.Account.fromJson(account));
    return new LocalAccountsMessage(operationId, accounts);
  }
}
exports.LocalAccountsMessage = LocalAccountsMessage;
//# sourceMappingURL=LocalAccountsMessage.js.map