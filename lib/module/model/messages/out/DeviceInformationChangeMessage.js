/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the device information change operation call.
 */
export class DeviceInformationChangeMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Specifies the new name of the device information.
   */

  /**
   * Specifies the new Firebase Cloud Messaging registration token.
   */

  /**
   * Disables the push notifications on the server side.
   */

  /**
   * Specifies the object defining the retry policy.
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
   * @param name specifies the new name of the device information.
   * @param fcmRegistrationToken specifies the new Firebase Cloud Messaging registration token.
   * @param disablePushNotifications disables the push notifications on the server side.
   * @param retryPolicy specifies the object defining the retry policy.
   */
  constructor(operationId, onSuccessProvided, onErrorProvided, requestHeaders, name, fcmRegistrationToken, disablePushNotifications, retryPolicy) {
    this.operationId = operationId;
    this.name = name;
    this.fcmRegistrationToken = fcmRegistrationToken;
    this.disablePushNotifications = disablePushNotifications;
    this.retryPolicy = retryPolicy;
    this.requestHeaders = requestHeaders;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
  }
}
//# sourceMappingURL=DeviceInformationChangeMessage.js.map