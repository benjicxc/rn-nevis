"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsPolicyCompliantInMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the policy compliant native event.
 */
class IsPolicyCompliantInMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * True if the {@link Authenticator} is compliant with the policy of the server.
   */

  /**
   * Default constructor for {@link IsPolicyCompliantInMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param isPolicyCompliant true if the {@link Authenticator} is compliant with the policy of the server.
   */
  constructor(operationId, isPolicyCompliant) {
    super();
    this.operationId = operationId;
    this.isPolicyCompliant = isPolicyCompliant;
  }
}
exports.IsPolicyCompliantInMessage = IsPolicyCompliantInMessage;
//# sourceMappingURL=IsPolicyCompliantInMessage.js.map