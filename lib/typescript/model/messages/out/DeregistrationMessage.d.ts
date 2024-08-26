/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { HttpOperationMessage } from './HttpOperationMessage';
import { OperationMessage } from './OperationMessage';
import type { AuthorizationProvider } from '../../../authorization/AuthorizationProvider';
import { TypedAuthorizationProvider } from '../../../model/typed/TypedAuthorizationProvider';
import { RequestHeaders } from '../../../operations/RequestHeaders';
/**
 * Holds the parameters of the deregistration operation call.
 */
export declare class DeregistrationMessage implements OperationMessage, HttpOperationMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The username whose {@link Authenticator} needs to be deregistered.
     * If no AAID is provided then all authenticators will be deregistered.
     */
    username?: string;
    /**
     * The aaid of the {@link Authenticator} needs to be deregistered.
     */
    aaid?: string;
    /**
     * The object providing the authorization.
     */
    authorizationProvider?: TypedAuthorizationProvider;
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
     * @param authorizationProvider the object providing the authorization.
     * @param username The username whose {@link Authenticator} needs to be deregistered.
     * @param aaid The aaid of the {@link Authenticator} needs to be deregistered.
     */
    constructor(operationId: string, onSuccessProvided: boolean, onErrorProvided: boolean, requestHeaders?: RequestHeaders, authorizationProvider?: AuthorizationProvider, username?: string, aaid?: string);
}
//# sourceMappingURL=DeregistrationMessage.d.ts.map