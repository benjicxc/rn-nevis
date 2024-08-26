"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountUsernameMessage = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the account selection operation platform channel call.
 */
class AccountUsernameMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The selected username.
   */

  /**
   * Default constructor for {@link AccountUsernameMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param username the selected username.
   */
  constructor(operationId, username) {
    this.operationId = operationId;
    this.username = username;
  }
}
exports.AccountUsernameMessage = AccountUsernameMessage;
//# sourceMappingURL=AccountUsernameMessage.js.map