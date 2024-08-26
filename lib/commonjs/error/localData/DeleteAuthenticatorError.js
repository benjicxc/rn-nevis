"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAuthenticatorError = void 0;
var _MobileAuthenticationClientError = require("../MobileAuthenticationClientError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The error which is thrown by {@link LocalData.deleteAuthenticator} in case of any error occurs.
 * For instance if the provided AAID is not known, or if an error occurred during deleting the associated
 * FIDO UAF credentials.
 */
class DeleteAuthenticatorError extends _MobileAuthenticationClientError.MobileAuthenticationClientError {}
exports.DeleteAuthenticatorError = DeleteAuthenticatorError;
//# sourceMappingURL=DeleteAuthenticatorError.js.map