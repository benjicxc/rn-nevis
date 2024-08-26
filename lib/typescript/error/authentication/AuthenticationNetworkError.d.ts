/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthenticationError } from './AuthenticationError';
import { SessionProvider } from '../../authorization/SessionProvider';
/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
export declare class AuthenticationNetworkError extends AuthenticationError {
    /**
     * Provides details about the error that occurred.
     */
    description: string;
    /**
     * The exception (if any) that caused this error.
     */
    cause?: string;
    /**
     * The {@link SessionProvider} that can be used to continue with the operation.
     */
    sessionProvider?: SessionProvider;
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
     */
    constructor(description: string, cause?: string, sessionProvider?: SessionProvider);
}
//# sourceMappingURL=AuthenticationNetworkError.d.ts.map