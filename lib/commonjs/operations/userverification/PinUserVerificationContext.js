"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinUserVerificationContextImpl = exports.PinUserVerificationContext = void 0;
var _UserVerificationContext = require("./UserVerificationContext");
var _PinUserVerificationErrorConverter = require("../../error/userVerification/PinUserVerificationErrorConverter");
var _Authenticator = require("../../localData/Authenticator");
var _PinAuthenticatorProtectionStatus = require("../pin/PinAuthenticatorProtectionStatus");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing information about the PIN user verification
 * (i.e. the user credential validation) operation to be done.
 *
 * This object contains the information required to ask the user to authenticate:
 * the authenticator to be used, whether there were previous errors authenticating, etc.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
class PinUserVerificationContext extends _UserVerificationContext.UserVerificationContext {
  /**
   * The authenticator protection status.
   */

  /**
   * When a recoverable error occurred during the last credential verification, it returns the
   * object describing the last error.
   *
   * If present, this means that an invalid PIN was provided in the previous invocation to
   * {@link PinUserVerificationHandler.verifyPin} and thus the protection status is
   * {@link PinProtectionStatusLastAttemptFailed}.
   */

  /**
   * Alternate constructor that creates a {@link UserVerificationContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link PinUserVerificationContext} instance.
   */
  static fromJson(json) {
    return PinUserVerificationContextImpl.fromJson(json);
  }
}
exports.PinUserVerificationContext = PinUserVerificationContext;
class PinUserVerificationContextImpl extends PinUserVerificationContext {
  constructor(authenticator, authenticatorProtectionStatus, lastRecoverableError) {
    super();
    this.authenticator = authenticator;
    this.authenticatorProtectionStatus = authenticatorProtectionStatus;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const authenticator = _Authenticator.Authenticator.fromJson(json.authenticator);
    const status = _PinAuthenticatorProtectionStatus.PinAuthenticatorProtectionStatus.fromJson(json.authenticatorProtectionStatus);
    const lastRecoverableError = json.lastRecoverableError && new _PinUserVerificationErrorConverter.PinUserVerificationErrorConverter(json.lastRecoverableError).convert();
    return new PinUserVerificationContextImpl(authenticator, status, lastRecoverableError);
  }
}
exports.PinUserVerificationContextImpl = PinUserVerificationContextImpl;
//# sourceMappingURL=PinUserVerificationContext.js.map