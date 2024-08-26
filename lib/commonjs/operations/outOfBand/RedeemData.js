"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedeemDataImpl = exports.RedeemData = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * A `RedeemData` instance contains information to be redeemed in order to trigger FIDO UAF operations.
 * The information is extracted from different channels like QR-Code, Push Notification, etc.
 */
class RedeemData {
  /**
   * The token that must be redeemed in the backend.
   */

  /**
   * The URI where the token must be redeemed.
   */

  /**
   * Alternate constructor that creates a {@link RedeemData} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link RedeemData} instance.
   */
  static fromJson(json) {
    return RedeemDataImpl.fromJson(json);
  }
}
exports.RedeemData = RedeemData;
class RedeemDataImpl extends RedeemData {
  constructor(token, redeemUrl) {
    super();
    this.token = token;
    this.redeemUrl = redeemUrl;
  }
  static fromJson(json) {
    return new RedeemDataImpl(json.token, json.redeemUrl);
  }
}
exports.RedeemDataImpl = RedeemDataImpl;
//# sourceMappingURL=RedeemData.js.map