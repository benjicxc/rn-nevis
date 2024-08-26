"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationMessage = void 0;
var _TypedRetryPolicy = require("../../../model/typed/TypedRetryPolicy");
var _TypedSessionProvider = require("../../../model/typed/TypedSessionProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the authentication operation call.
 */
class AuthenticationMessage {
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
   * Specifies the username that must be used to authenticate.
   */

  /**
   * Specifies authorization information required to the authentication.
   */

  /**
   * The retry policy to be used to obtain an {@link AuthorizationProvider} after the
   * user authenticates successfully.
   */

  /**
   * Default constructor for {@link AuthenticationMessage}.
   *
   * @param operationId the identifier of the operation.
   * provided.
   * @param authenticatorSelectorProvided flag that tells whether the authenticator
   * selector is provided.
   * @param pinUserVerifierProvided flag that tells whether the PIN user verifier
   * is provided.
   * @param biometricUserVerifierProvided flag that tells whether the biometric
   * user verifier is provided.
   * @param devicePasscodeUserVerifierProvided flag that tells whether the device passcode
   * user verifier is provided.
   * @param fingerprintUserVerifierProvided flag that tells whether the fingerprint
   * user verifier is provided.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param username specifies the username that must be used to authenticate.
   * @param sessionProvider specifies authorization information required to the
   * authentication.
   * @param retryPolicy The retry policy to be used to obtain an
   * {@link AuthorizationProvider} after the user authenticates successfully.
   * @param requestHeaders the HTTP headers.
   */
  constructor(operationId, authenticatorSelectorProvided, pinUserVerifierProvided, biometricUserVerifierProvided, devicePasscodeUserVerifierProvided, fingerprintUserVerifierProvided, onSuccessProvided, onErrorProvided, username, sessionProvider, retryPolicy, requestHeaders) {
    this.operationId = operationId;
    this.accountSelectorProvided = false;
    this.authenticatorSelectorProvided = authenticatorSelectorProvided;
    this.pinEnrollerProvided = false;
    this.pinUserVerifierProvided = pinUserVerifierProvided;
    this.biometricUserVerifierProvided = biometricUserVerifierProvided;
    this.devicePasscodeUserVerifierProvided = devicePasscodeUserVerifierProvided;
    this.fingerprintUserVerifierProvided = fingerprintUserVerifierProvided;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    this.username = username;
    this.requestHeaders = requestHeaders;
    if (sessionProvider) {
      this.sessionProvider = _TypedSessionProvider.TypedSessionProvider.create(sessionProvider);
    }
    if (retryPolicy) {
      this.retryPolicy = _TypedRetryPolicy.TypedRetryPolicy.create(retryPolicy);
    }
  }
}
exports.AuthenticationMessage = AuthenticationMessage;
//# sourceMappingURL=AuthenticationMessage.js.map