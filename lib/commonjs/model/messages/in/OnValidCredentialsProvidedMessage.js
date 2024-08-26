"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnValidCredentialsProvidedMessage = void 0;
var _Authenticator = require("../../../localData/Authenticator");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the valid credentials provided native event.
 */
class OnValidCredentialsProvidedMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The authenticator.
   */

  /**
   * Default constructor for {@link OnValidCredentialsProvidedMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param authenticator the authenticator.
   */
  constructor(operationId, authenticator) {
    super();
    this.operationId = operationId;
    this.authenticator = authenticator;
  }

  /**
   * Alternate constructor that creates an {@link OnValidCredentialsProvidedMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const authenticator = _Authenticator.Authenticator.fromJson(json.authenticator);
    return new OnValidCredentialsProvidedMessage(operationId, authenticator);
  }
}
exports.OnValidCredentialsProvidedMessage = OnValidCredentialsProvidedMessage;
//# sourceMappingURL=OnValidCredentialsProvidedMessage.js.map