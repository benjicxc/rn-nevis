"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollerMessage = void 0;
var _PinEnrollmentContext = require("../../../operations/pin/PinEnrollmentContext");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the enroll pin native event.
 */
class PinEnrollerMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The pin enrollment context.
   */

  /**
   * Default constructor for {@link PinEnrollerMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param context the pin enrollment context.
   */
  constructor(operationId, context) {
    super();
    this.operationId = operationId;
    this.context = context;
  }

  /**
   * Alternate constructor that creates an {@link PinEnrollerMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const context = _PinEnrollmentContext.PinEnrollmentContext.fromJson(json.context);
    return new PinEnrollerMessage(operationId, context);
  }
}
exports.PinEnrollerMessage = PinEnrollerMessage;
//# sourceMappingURL=PinEnrollerMessage.js.map