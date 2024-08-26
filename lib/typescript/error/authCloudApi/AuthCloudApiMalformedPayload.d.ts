/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthCloudApiError } from './AuthCloudApiError';
/**
 * A problem with the provided Auth Cloud API response occurred.
 *
 * The message was malformed.
 */
export declare class AuthCloudApiMalformedPayload extends AuthCloudApiError {
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
//# sourceMappingURL=AuthCloudApiMalformedPayload.d.ts.map