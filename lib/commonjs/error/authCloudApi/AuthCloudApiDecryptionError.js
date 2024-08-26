"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCloudApiDecryptionError = void 0;
var _AuthCloudApiError = require("./AuthCloudApiError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The encrypted contents of the Auth Cloud API response could not be decrypted.
 *
 * This occurs for instance when the keys that are used to decrypt the Auth Cloud API response are deleted.
 */
class AuthCloudApiDecryptionError extends _AuthCloudApiError.AuthCloudApiError {
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
exports.AuthCloudApiDecryptionError = AuthCloudApiDecryptionError;
//# sourceMappingURL=AuthCloudApiDecryptionError.js.map