"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticatorSelector = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object in charge of selecting the authenticator to be used to perform an operation.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see
 * - {@link Registration.authenticatorSelector}
 * - {@link Authentication.authenticatorSelector}
 * - {@link AuthCloudApiRegistration.authenticatorSelector}
 * - {@link OutOfBandRegistration.authenticatorSelector}
 * - {@link OutOfBandAuthentication.authenticatorSelector}
 */
class AuthenticatorSelector {}
exports.AuthenticatorSelector = AuthenticatorSelector;
//# sourceMappingURL=AuthenticatorSelector.js.map