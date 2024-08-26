/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { RequestHeaders } from '../../../operations/RequestHeaders';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Common ancestor for HTTP operation based messages.
 */
export declare abstract class HttpOperationMessage extends ChannelMessage {
    /**
     * Specifies the additional request headers that must be included in the HTTP requests sent by
     * the operation.
     */
    abstract requestHeaders?: RequestHeaders;
}
//# sourceMappingURL=HttpOperationMessage.d.ts.map