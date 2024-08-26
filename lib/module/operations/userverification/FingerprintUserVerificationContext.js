/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserVerificationContext } from './UserVerificationContext';
import { FingerprintUserVerificationErrorConverter } from '../../error/userVerification/FingerprintUserVerificationErrorConverter';
import { Authenticator } from '../../localData/Authenticator';

/**
 * The object providing information about the biometric user verification (i.e. the user credential
 * validation) operation to be done.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
export class FingerprintUserVerificationContext extends UserVerificationContext {
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
export class FingerprintUserVerificationContextImpl extends FingerprintUserVerificationContext {
  constructor(authenticator, lastRecoverableError) {
    super();
    this.authenticator = authenticator;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const authenticator = Authenticator.fromJson(json.authenticator);
    const lastRecoverableError = json.lastRecoverableError && new FingerprintUserVerificationErrorConverter(json.lastRecoverableError).convert();
    return new FingerprintUserVerificationContextImpl(authenticator, lastRecoverableError);
  }
}
//# sourceMappingURL=FingerprintUserVerificationContext.js.map