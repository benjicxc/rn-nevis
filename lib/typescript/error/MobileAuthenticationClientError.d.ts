/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * The parent of all the errors that can be returned.
 */
export declare abstract class MobileAuthenticationClientError {
    /**
     * Provides details about the error that occurred.
     *
     * This is not a localized message and is targeted to developers in the context
     * of debugging/problem analysis.
     */
    abstract description: string;
    /**
     * The exception (if any) that caused this error.
     */
    abstract cause?: string;
}
//# sourceMappingURL=MobileAuthenticationClientError.d.ts.map