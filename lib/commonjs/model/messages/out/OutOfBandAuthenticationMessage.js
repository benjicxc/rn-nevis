"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandAuthenticationMessage = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the out-of-band authentication operation call.
 */
class OutOfBandAuthenticationMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Flag that tells whether the account selector is provided.
   */

  /**
   * Flag that tells whether the authenticator selector is provided.
   */

  /**
   * Flag that tells whether the PIN enroller is provided.
   */

  /**
   * Flag that tells whether the PIN user verifier is provided.
   */

  /**
   * Flag that tells whether the biometric user verifier is provided.
   */

  /**
   * Flag that tells whether the device passcode user verifier is provided.
   */

  /**
   * Flag that tells whether the fingerprint user verifier is provided.
   */

  /**
   * Flag that tells whether the success callback is provided.
   */

  /**
   * Flag that tells whether the error callback is provided.
   */

  /**
   * Specifies the additional request headers that must be included in the HTTP requests sent by
   * the operation.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param accountSelectorProvided flag that tells whether the account selector is provided.
   * @param authenticatorSelectorProvided flag that tells whether the authenticator selector is provided.
   * @param pinEnrollerProvided flag that tells whether the PIN enroller is provided.
   * @param pinUserVerifierProvided flag that tells whether the PIN user verifier is provided.
   * @param biometricUserVerifierProvided flag that tells whether the biometric user verifier is
   * provided.
   * @param devicePasscodeUserVerifierProvided flag that tells whether the device passcode user
   * verifier is provided.
   * @param fingerprintUserVerifierProvided flag that tells whether the fingerprint user verifier
   * is provided.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param requestHeaders specifies the additional request headers that must be included in the
   * HTTP requests sent by the operation.
   */
  constructor(operationId, accountSelectorProvided, authenticatorSelectorProvided, pinEnrollerProvided, pinUserVerifierProvided, biometricUserVerifierProvided, devicePasscodeUserVerifierProvided, fingerprintUserVerifierProvided, onSuccessProvided, onErrorProvided, requestHeaders) {
    this.operationId = operationId;
    this.accountSelectorProvided = accountSelectorProvided;
    this.authenticatorSelectorProvided = authenticatorSelectorProvided;
    this.pinEnrollerProvided = pinEnrollerProvided;
    this.pinUserVerifierProvided = pinUserVerifierProvided;
    this.biometricUserVerifierProvided = biometricUserVerifierProvided;
    this.devicePasscodeUserVerifierProvided = devicePasscodeUserVerifierProvided;
    this.fingerprintUserVerifierProvided = fingerprintUserVerifierProvided;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    this.requestHeaders = requestHeaders;
  }
}
exports.OutOfBandAuthenticationMessage = OutOfBandAuthenticationMessage;
//# sourceMappingURL=OutOfBandAuthenticationMessage.js.map