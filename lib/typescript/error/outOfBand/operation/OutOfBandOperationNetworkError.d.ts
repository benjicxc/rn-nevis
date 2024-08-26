/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OutOfBandOperationError } from './OutOfBandOperationError';
/**
 * A network error occurred while redeeming the token: either the server was not reachable or it returned
 * an HTTP error.
 */
export declare class OutOfBandOperationNetworkError extends OutOfBandOperationError {
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
//# sourceMappingURL=OutOfBandOperationNetworkError.d.ts.map