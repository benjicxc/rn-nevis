"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FingerprintUserVerificationContextImpl = exports.FingerprintUserVerificationContext = void 0;
var _UserVerificationContext = require("./UserVerificationContext");
var _FingerprintUserVerificationErrorConverter = require("../../error/userVerification/FingerprintUserVerificationErrorConverter");
var _Authenticator = require("../../localData/Authenticator");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing information about the biometric user verification (i.e. the user credential
 * validation) operation to be done.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
class FingerprintUserVerificationContext extends _UserVerificationContext.UserVerificationContext {
  /**
   * When a recoverable error occurred during the last credential verification, this returns the
   * object describing the last error.
   */

  /**
   * Alternate constructor that creates a {@link BiometricUserVerificationContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link BiometricUserVerificationContext} instance.
   */
  static fromJson(json) {
    return FingerprintUserVerificationContextImpl.fromJson(json);
  }
}
exports.FingerprintUserVerificationContext = FingerprintUserVerificationContext;
class FingerprintUserVerificationContextImpl extends FingerprintUserVerificationContext {
  constructor(authenticator, lastRecoverableError) {
    super();
    this.authenticator = authenticator;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const authenticator = _Authenticator.Authenticator.fromJson(json.authenticator);
    const lastRecoverableError = json.lastRecoverableError && new _FingerprintUserVerificationErrorConverter.FingerprintUserVerificationErrorConverter(json.lastRecoverableError).convert();
    return new FingerprintUserVerificationContextImpl(authenticator, lastRecoverableError);
  }
}
exports.FingerprintUserVerificationContextImpl = FingerprintUserVerificationContextImpl;
//# sourceMappingURL=FingerprintUserVerificationContext.js.map