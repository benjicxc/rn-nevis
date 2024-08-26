/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { SessionProvider } from '../authorization/SessionProvider';
import { FidoErrorCode } from '../error/FidoErrorCode';
/**
 * Represents the error that can occur during communicating with the native plugins.
 */
export declare class ChannelError {
    /**
     * The type of the error (e.g. `DeviceProtectionError` or `FidoError`).
     */
    type: string;
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
     * The FIDO UAF error that occurred.
     *
     * @see {@link OperationFidoError}, {@link AuthCloudApiFidoError}, and {@link AuthenticationFidoError}.
     */
    errorCode?: FidoErrorCode;
    /**
     * The message is provided by the operating system during fingerprint verification error.
     */
    message?: string;
    /**
     * The default constructor.
     *
     * @param type The type of the error (e.g. `DeviceProtectionError` or `FidoError`).
     * @param description The exception (if any) that caused this error.
     * @param cause The exception (if any) that caused this error.
     * @param sessionProvider The {@link SessionProvider} that can be used to continue with the operation.
     * @param errorCode The FIDO UAF error that occurred.
     * @param message The message is provided by the operating system during fingerprint verification error.
     */
    constructor(type: string, description: string, cause?: string, sessionProvider?: SessionProvider, errorCode?: FidoErrorCode, message?: string);
    /**
     * Alternate constructor that creates a {@link ChannelError} from a json.
     *
     * @param input contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(input: any): ChannelError;
}
//# sourceMappingURL=ChannelError.d.ts.map