/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Common ancestor for operation based messages.
 */
export declare abstract class OperationMessage extends ChannelMessage {
    /**
     * Flag that tells whether the success callback is provided.
     */
    abstract onSuccessProvided: boolean;
    /**
     * Flag that tells whether the error callback is provided.
     */
    abstract onErrorProvided: boolean;
}
//# sourceMappingURL=OperationMessage.d.ts.map