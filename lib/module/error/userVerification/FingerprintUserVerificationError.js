/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { RecoverableError } from '../RecoverableError';

/**
 * The recoverable error that can occur when verifying the user with fingerprint. This occurs when
 * the user provides bad fingerprints.
 *
 * When this error occurs, the {@link FingerprintUserVerifier.verifyFingerprint} method will be invoked
 * again. This error will be returned by the {@link FingerprintUserVerificationContext.lastRecoverableError}.
 */
export class FingerprintUserVerificationError extends RecoverableError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * If available, this returns a localized message describing the error that can be presented
   * to the end-user. This message is provided by the operating system.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param message a localized message describing the error that can be presented to the end-user.
   */
  constructor(description, cause, message) {
    super();
    this.description = description;
    this.cause = cause;
    this.message = message;
  }
}
//# sourceMappingURL=FingerprintUserVerificationError.js.map