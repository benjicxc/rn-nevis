/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the PIN verification call.
 */
export declare class PinVerificationMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The PIN parameter of the call.
     */
    pin: string;
    /**
     * Default constructor for {@VerifyPinMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param pin the PIN parameter of the call.
     */
    constructor(operationId: string, pin: string);
}
//# sourceMappingURL=PinVerificationMessage.d.ts.map