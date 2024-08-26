/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedAuthorizationProvider } from '../../../model/typed/TypedAuthorizationProvider';
/**
 * Holds the parameters of the deregistration operation call.
 */
export class DeregistrationMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The username whose {@link Authenticator} needs to be deregistered.
   * If no AAID is provided then all authenticators will be deregistered.
   */

  /**
   * The aaid of the {@link Authenticator} needs to be deregistered.
   */

  /**
   * The object providing the authorization.
   */

  /**
   * Specifies the additional request headers that must be included in the HTTP requests sent by
   * the operation.
   */

  /**
   * Flag that tells whether the success callback is provided.
   */

  /**
   * Flag that tells whether the error callback is provided.
   */

  /**
   * Default constructor for {@link DeregistrationMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param requestHeaders the HTTP headers.
   * @param authorizationProvider the object providing the authorization.
   * @param username The username whose {@link Authenticator} needs to be deregistered.
   * @param aaid The aaid of the {@link Authenticator} needs to be deregistered.
   */
  constructor(operationId, onSuccessProvided, onErrorProvided, requestHeaders, authorizationProvider, username, aaid) {
    this.operationId = operationId;
    this.username = username;
    this.aaid = aaid;
    this.requestHeaders = requestHeaders;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    if (authorizationProvider) {
      this.authorizationProvider = TypedAuthorizationProvider.create(authorizationProvider);
    }
  }
}
//# sourceMappingURL=DeregistrationMessage.js.map