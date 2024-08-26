/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { DevicePasscodePromptOptions } from './DevicePasscodePromptOptions';
import { type OsAuthenticationListenHandler } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
/**
 *
 * The objects consuming the outcome of an interaction where the user provides device passcode credentials.
 *
 * This is used with the {@link Aaid.DEVICE_PASSCODE} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link DevicePasscodeUserVerifier.verifyDevicePasscode}
 */
export declare abstract class DevicePasscodeUserVerificationHandler extends UserVerificationHandler {
    /**
     * When this method is invoked, the SDK will invoke the operating system prompt to ask the user
     * to provide credentials.
     *
     * So no GUI must be explicitly defined by the code using the SDK (as required in the fingerprint
     * and the PIN authenticators).
     *
     * @param devicePasscodePromptOptions the options to be used when prompting.
     * @returns an {@link OsAuthenticationListenHandler} that can be used to cancel listening for OS
     * credentials.
     */
    abstract listenForOsCredentials(devicePasscodePromptOptions?: DevicePasscodePromptOptions): Promise<OsAuthenticationListenHandler>;
}
export declare class DevicePasscodeUserVerificationHandlerImpl extends DevicePasscodeUserVerificationHandler {
    private readonly _operationId;
    private readonly _listenForOsCredentials;
    constructor(operationId: string);
    listenForOsCredentials(devicePasscodePromptOptions?: DevicePasscodePromptOptions): Promise<OsAuthenticationListenHandler>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=DevicePasscodeUserVerificationHandler.d.ts.map