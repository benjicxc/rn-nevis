/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the account selection operation platform channel call.
 */
export class AccountUsernameMessage {
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
//# sourceMappingURL=AccountUsernameMessage.js.map