"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BiometricUserVerificationContextImpl = exports.BiometricUserVerificationContext = void 0;
var _UserVerificationContext = require("./UserVerificationContext");
var _Authenticator = require("../../localData/Authenticator");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing information about the biometric user verification (i.e. the user credential
 * validation) operation to be done.
 *
 * @see {@link BiometricUserVerifier.verifyBiometric}
 */
class BiometricUserVerificationContext extends _UserVerificationContext.UserVerificationContext {
  /**
   * Alternate constructor that creates a {@link BiometricUserVerificationContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link BiometricUserVerificationContext} instance.
   */
  static fromJson(json) {
    return BiometricUserVerificationContextImpl.fromJson(json);
  }
}
exports.BiometricUserVerificationContext = BiometricUserVerificationContext;
class BiometricUserVerificationContextImpl extends BiometricUserVerificationContext {
  constructor(authenticator) {
    super();
    this.authenticator = authenticator;
  }
  static fromJson(json) {
    const authenticator = _Authenticator.Authenticator.fromJson(json.authenticator);
    return new BiometricUserVerificationContextImpl(authenticator);
  }
}
exports.BiometricUserVerificationContextImpl = BiometricUserVerificationContextImpl;
//# sourceMappingURL=BiometricUserVerificationContext.js.map