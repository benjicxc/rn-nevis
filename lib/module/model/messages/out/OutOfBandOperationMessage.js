/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the out-of-band operation call.
 */
export class OutOfBandOperationMessage {
  /**
   * The identifier of the operation.
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
   * The identifier of the underlying out-of-band operation.
   */

  /**
   * The out-of-band payload to be handled.
   */

  /**
   * Flag that tells whether the registration callback is provided.
   */

  /**
   * Flag that tells whether the authentication callback is provided.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param subOperationId the identifier of the underlying out-of-band operation.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param requestHeaders specifies the additional request headers that must be included in the
   * HTTP requests sent by the operation.
   * @param payload the out-of-band payload to be handled.
   * @param onRegistrationProvided flag that tells whether the registration callback is provided.
   * @param onAuthenticationProvided flag that tells whether the authentication callback is provided.
   */
  constructor(operationId, subOperationId, onSuccessProvided, onErrorProvided, requestHeaders, payload, onRegistrationProvided, onAuthenticationProvided) {
    this.operationId = operationId;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    this.requestHeaders = requestHeaders;
    this.subOperationId = subOperationId;
    this.payload = payload;
    this.onRegistrationProvided = onRegistrationProvided;
    this.onAuthenticationProvided = onAuthenticationProvided;
  }
}
//# sourceMappingURL=OutOfBandOperationMessage.js.map