"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsPolicyCompliantMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the policy compliant call.
 */
class IsPolicyCompliantMessage extends _ChannelMessage.ChannelMessage {
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
exports.IsPolicyCompliantMessage = IsPolicyCompliantMessage;
//# sourceMappingURL=IsPolicyCompliantMessage.js.map