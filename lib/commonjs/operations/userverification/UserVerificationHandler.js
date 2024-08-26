"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserVerificationHandler = void 0;
var _CancellableHandler = require("../CancellableHandler");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user provides credentials.
 *
 * Depending on the type of the authenticator, the credentials must be provided to this object.
 */
class UserVerificationHandler extends _CancellableHandler.CancellableHandler {}
exports.UserVerificationHandler = UserVerificationHandler;
//# sourceMappingURL=UserVerificationHandler.js.map