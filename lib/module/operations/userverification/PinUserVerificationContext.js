/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserVerificationContext } from './UserVerificationContext';
import { PinUserVerificationErrorConverter } from '../../error/userVerification/PinUserVerificationErrorConverter';
import { Authenticator } from '../../localData/Authenticator';
import { PinAuthenticatorProtectionStatus } from '../pin/PinAuthenticatorProtectionStatus';

/**
 * The object providing information about the PIN user verification
 * (i.e. the user credential validation) operation to be done.
 *
 * This object contains the information required to ask the user to authenticate:
 * the authenticator to be used, whether there were previous errors authenticating, etc.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
export class PinUserVerificationContext extends UserVerificationContext {
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
export class PinUserVerificationContextImpl extends PinUserVerificationContext {
  constructor(authenticator, authenticatorProtectionStatus, lastRecoverableError) {
    super();
    this.authenticator = authenticator;
    this.authenticatorProtectionStatus = authenticatorProtectionStatus;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const authenticator = Authenticator.fromJson(json.authenticator);
    const status = PinAuthenticatorProtectionStatus.fromJson(json.authenticatorProtectionStatus);
    const lastRecoverableError = json.lastRecoverableError && new PinUserVerificationErrorConverter(json.lastRecoverableError).convert();
    return new PinUserVerificationContextImpl(authenticator, status, lastRecoverableError);
  }
}
//# sourceMappingURL=PinUserVerificationContext.js.map