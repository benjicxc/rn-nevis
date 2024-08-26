"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalAuthenticatorsMessage = void 0;
var _Authenticator = require("../../../localData/Authenticator");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the local authenticators native event.
 */
class LocalAuthenticatorsMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The list of the registered authenticators.
   */

  /**
   * Default constructor for {@link LocalAuthenticatorsMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param authenticators the list of the registered authenticators.
   */
  constructor(operationId, authenticators) {
    super();
    this.operationId = operationId;
    this.authenticators = authenticators;
  }

  /**
   * Alternate constructor that creates a {@link LocalAuthenticatorsMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const data = json.authenticators;
    const authenticators = data.map(authenticator => _Authenticator.Authenticator.fromJson(authenticator));
    return new LocalAuthenticatorsMessage(operationId, authenticators);
  }
}
exports.LocalAuthenticatorsMessage = LocalAuthenticatorsMessage;
//# sourceMappingURL=LocalAuthenticatorsMessage.js.map