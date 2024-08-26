/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { HttpOperationMessage } from './HttpOperationMessage';
import { UserInteractionOperationMessage } from './UserInteractionOperationMessage';
import type { SessionProvider } from '../../../authorization/SessionProvider';
import { TypedRetryPolicy } from '../../../model/typed/TypedRetryPolicy';
import { TypedSessionProvider } from '../../../model/typed/TypedSessionProvider';
import { RequestHeaders } from '../../../operations/RequestHeaders';
import type { RetryPolicy } from '../../../operations/RetryPolicy';
/**
 * Holds the parameters of the authentication operation call.
 */
export declare class AuthenticationMessage implements UserInteractionOperationMessage, HttpOperationMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * Flag that tells whether the account selector is provided.
     */
    accountSelectorProvided: boolean;
    /**
     * Flag that tells whether the authenticator selector is provided.
     */
    authenticatorSelectorProvided: boolean;
    /**
     * Flag that tells whether the PIN enroller is provided.
     */
    pinEnrollerProvided: boolean;
    /**
     * Flag that tells whether the PIN user verifier is provided.
     */
    pinUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the biometric user verifier is provided.
     */
    biometricUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the device passcode user verifier is provided.
     */
    devicePasscodeUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the fingerprint user verifier is provided.
     */
    fingerprintUserVerifierProvided: boolean;
    /**
     * Flag that tells whether the success callback is provided.
     */
    onSuccessProvided: boolean;
    /**
     * Flag that tells whether the error callback is provided.
     */
    onErrorProvided: boolean;
    /**
     * Specifies the additional request headers that must be included in the HTTP requests sent by
     * the operation.
     */
    requestHeaders?: RequestHeaders;
    /**
     * Specifies the username that must be used to authenticate.
     */
    username?: string;
    /**
     * Specifies authorization information required to the authentication.
     */
    sessionProvider?: TypedSessionProvider;
    /**
     * The retry policy to be used to obtain an {@link AuthorizationProvider} after the
     * user authenticates successfully.
     */
    retryPolicy?: TypedRetryPolicy;
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
    constructor(operationId: string, authenticatorSelectorProvided: boolean, pinUserVerifierProvided: boolean, biometricUserVerifierProvided: boolean, devicePasscodeUserVerifierProvided: boolean, fingerprintUserVerifierProvided: boolean, onSuccessProvided: boolean, onErrorProvided: boolean, username?: string, sessionProvider?: SessionProvider, retryPolicy?: RetryPolicy, requestHeaders?: RequestHeaders);
}
//# sourceMappingURL=AuthenticationMessage.d.ts.map