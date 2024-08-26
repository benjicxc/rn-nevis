/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { PinChangeRecoverableError } from './PinChangeRecoverableError';
/**
 * The provided new PIN is not compliant with the {@link PinPolicy}.
 */
export declare class PinChangeRecoverableInvalidPinFormat extends PinChangeRecoverableError {
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
//# sourceMappingURL=PinChangeRecoverableInvalidPinFormat.d.ts.map