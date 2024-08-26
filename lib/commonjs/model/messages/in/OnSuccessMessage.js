"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnSuccessMessage = void 0;
var _AuthorizationProvider = require("../../../authorization/AuthorizationProvider");
var _OutOfBandPayload = require("../../../operations/outOfBand/OutOfBandPayload");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the success native event.
 */
class OnSuccessMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The object providing authorization.
   */

  /**
   * The out-of-band payload.
   */

  /**
   * Default constructor for {@link OnSuccessMessage}.
   *
   * @param operationId the identifier of operation.
   * @param authorizationProvider the object providing authorization.
   * @param outOfBandPayload the out-of-band payload.
   */
  constructor(operationId, authorizationProvider, outOfBandPayload) {
    super();
    this.operationId = operationId;
    this.authorizationProvider = authorizationProvider;
    this.outOfBandPayload = outOfBandPayload;
  }

  /**
   * Alternate constructor that creates an {@link OnSuccessMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    let provider;
    if (json.authorizationProvider) {
      provider = _AuthorizationProvider.AuthorizationProvider.fromJson(json.authorizationProvider);
    }
    let payload;
    if (json.outOfBandPayload) {
      payload = _OutOfBandPayload.OutOfBandPayload.fromJson(json.outOfBandPayload);
    }
    return new OnSuccessMessage(json.operationId, provider, payload);
  }
}
exports.OnSuccessMessage = OnSuccessMessage;
//# sourceMappingURL=OnSuccessMessage.js.map