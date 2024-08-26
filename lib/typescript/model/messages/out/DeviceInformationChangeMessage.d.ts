/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { RequestHeaders } from '../../../operations/RequestHeaders';
import { RetryPolicy } from '../../../operations/RetryPolicy';
/**
 * Holds the parameters of the device information change operation call.
 */
export declare class DeviceInformationChangeMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * Specifies the new name of the device information.
     */
    name?: string;
    /**
     * Specifies the new Firebase Cloud Messaging registration token.
     */
    fcmRegistrationToken?: string;
    /**
     * Disables the push notifications on the server side.
     */
    disablePushNotifications?: boolean;
    /**
     * Specifies the object defining the retry policy.
     */
    retryPolicy?: RetryPolicy;
    /**
     * Specifies the additional request headers that must be included in the HTTP requests sent by
     * the operation.
     */
    requestHeaders?: RequestHeaders;
    /**
     * Flag that tells whether the success callback is provided.
     */
    onSuccessProvided: boolean;
    /**
     * Flag that tells whether the error callback is provided.
     */
    onErrorProvided: boolean;
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
    constructor(operationId: string, onSuccessProvided: boolean, onErrorProvided: boolean, requestHeaders?: RequestHeaders, name?: string, fcmRegistrationToken?: string, disablePushNotifications?: boolean, retryPolicy?: RetryPolicy);
}
//# sourceMappingURL=DeviceInformationChangeMessage.d.ts.map