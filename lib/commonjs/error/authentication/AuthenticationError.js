"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationError = void 0;
var _MobileAuthenticationClientError = require("../MobileAuthenticationClientError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An extension of {@link MobileAuthenticationClientError} for the {@link Authentication} operation.
 *
 * The SDK returns a {@link SessionProvider} that can be used to continue the authentication.
 * This can be useful when the SDK is used with Identity Suite and cookies as backend:
 * even if the FIDO UAF authentication fails, we may want to continue using the
 * same authentication session to ask the end-user to authenticate in another way.
 */
class AuthenticationError extends _MobileAuthenticationClientError.MobileAuthenticationClientError {}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map