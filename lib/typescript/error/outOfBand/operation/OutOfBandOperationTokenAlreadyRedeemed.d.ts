/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OutOfBandOperationError } from './OutOfBandOperationError';
/**
 * The token was already redeemed.
 */
export declare class OutOfBandOperationTokenAlreadyRedeemed extends OutOfBandOperationError {
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
//# sourceMappingURL=OutOfBandOperationTokenAlreadyRedeemed.d.ts.map