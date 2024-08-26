"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCloudApiTokenAlreadyRedeemed = void 0;
var _AuthCloudApiError = require("./AuthCloudApiError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The token was already redeemed.
 */
class AuthCloudApiTokenAlreadyRedeemed extends _AuthCloudApiError.AuthCloudApiError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super();
    this.description = description;
    this.cause = cause;
  }
}
exports.AuthCloudApiTokenAlreadyRedeemed = AuthCloudApiTokenAlreadyRedeemed;
//# sourceMappingURL=AuthCloudApiTokenAlreadyRedeemed.js.map