/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the PIN enrollment call.
 */
export declare class PinEnrollMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The pin.
     */
    pin: string;
    /**
     * Default constructor for {@link PinEnrollMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param pin the pin.
     */
    constructor(operationId: string, pin: string);
}
//# sourceMappingURL=PinEnrollMessage.d.ts.map