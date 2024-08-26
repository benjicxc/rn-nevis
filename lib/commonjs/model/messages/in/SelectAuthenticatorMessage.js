"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectAuthenticatorMessage = void 0;
var _AuthenticatorSelectionContext = require("../../../operations/selection/AuthenticatorSelectionContext");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the select authenticator native event.
 */
class SelectAuthenticatorMessage extends _ChannelMessage.ChannelMessage {
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
    const context = _AuthenticatorSelectionContext.AuthenticatorSelectionContext.fromJson(json.context);
    return new SelectAuthenticatorMessage(operationId, context);
  }
}
exports.SelectAuthenticatorMessage = SelectAuthenticatorMessage;
//# sourceMappingURL=SelectAuthenticatorMessage.js.map