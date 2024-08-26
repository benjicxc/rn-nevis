"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyUserMessage = void 0;
var _TypedUserVerificationContext = require("../../../model/typed/TypedUserVerificationContext");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the verify user native event.
 */
class VerifyUserMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The user verification context.
   */

  /**
   * Default constructor for {@link VerifyUserMessage}.
   *
   * @param operationId the identifier of operation.
   * @param context the user verification context.
   */
  constructor(operationId, context) {
    super();
    this.operationId = operationId;
    this.context = context;
  }

  /**
   * Alternate constructor that creates a {@link VerifyUserMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const typedContext = _TypedUserVerificationContext.TypedUserVerificationContext.fromJson(json.context);
    return new VerifyUserMessage(operationId, typedContext.wrapped);
  }
}
exports.VerifyUserMessage = VerifyUserMessage;
//# sourceMappingURL=VerifyUserMessage.js.map