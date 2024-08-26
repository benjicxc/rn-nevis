/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserVerificationContext } from './UserVerificationContext';
import { Authenticator } from '../../localData/Authenticator';

/**
 * The object providing information about the biometric user verification (i.e. the user credential
 * validation) operation to be done.
 *
 * @see {@link BiometricUserVerifier.verifyBiometric}
 */
export class BiometricUserVerificationContext extends UserVerificationContext {
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
export class BiometricUserVerificationContextImpl extends BiometricUserVerificationContext {
  constructor(authenticator) {
    super();
    this.authenticator = authenticator;
  }
  static fromJson(json) {
    const authenticator = Authenticator.fromJson(json.authenticator);
    return new BiometricUserVerificationContextImpl(authenticator);
  }
}
//# sourceMappingURL=BiometricUserVerificationContext.js.map