/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { DeleteAuthenticatorError } from './DeleteAuthenticatorError';
/**
 * Unknown error, handling not categorized error cases.
 */
export declare class DeleteAuthenticatorUnknownError extends DeleteAuthenticatorError {
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
//# sourceMappingURL=DeleteAuthenticatorUnknownError.d.ts.map