/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { DeleteAuthenticatorError } from './DeleteAuthenticatorError';
/**
 * Invalid AAID were provided during authenticator deletion.
 */
export declare class DeleteAuthenticatorInvalidAaidError extends DeleteAuthenticatorError {
    /**
     * Provides details about the error that occurred.
     */
    description: string;
    /**
     * The exception (if any) that caused this error.
     */
    cause?: string;
    /**
     * The default constructor.
     *
     * @param description provides details about the error that occurred.
     * @param cause the exception (if any) that caused this error.
     */
    constructor(description: string, cause?: string);
}
//# sourceMappingURL=DeleteAuthenticatorInvalidAaidError.d.ts.map