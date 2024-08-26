/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { TypedPromptOptions } from '../../../model/typed/TypedPromptOptions';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the listening of OS credentials call.
 */
export declare class ListenForOsCredentialsMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The prompt options to be used in case of biometric or device passcode authenticator.
     * This object could be either a {@link BiometricPromptOptions} or a {@link DevicePasscodePromptOptions}.
     */
    promptOptions?: TypedPromptOptions;
    /**
     * Creates a new instance.
     *
     * @param operationId the identifier of the operation.
     * @param promptOptions the prompt options to be used in case of biometric or device passcode authenticator.
     */
    constructor(operationId: string, promptOptions?: TypedPromptOptions);
}
//# sourceMappingURL=ListenForOsCredentialsMessage.d.ts.map