"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalDeleteAuthenticatorMessage = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the local delete authenticator operation call.
 */
class LocalDeleteAuthenticatorMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The username whose {@link Authenticator} needs to be deleted.
   * If no AAID is provided then all authenticators will be deleted.
   */

  /**
   * The aaid of the {@link Authenticator} needs to be deleted.
   */

  constructor(operationId, username, aaid) {
    this.operationId = operationId;
    this.username = username;
    this.aaid = aaid;
  }
}
exports.LocalDeleteAuthenticatorMessage = LocalDeleteAuthenticatorMessage;
//# sourceMappingURL=LocalDeleteAuthenticatorMessage.js.map