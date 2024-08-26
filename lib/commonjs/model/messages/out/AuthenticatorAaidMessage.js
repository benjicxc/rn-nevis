"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticatorAaidMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the authenticator selection call.
 */
class AuthenticatorAaidMessage extends _ChannelMessage.ChannelMessage {
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
exports.AuthenticatorAaidMessage = AuthenticatorAaidMessage;
//# sourceMappingURL=AuthenticatorAaidMessage.js.map