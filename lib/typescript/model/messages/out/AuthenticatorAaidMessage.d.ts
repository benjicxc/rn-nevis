/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the authenticator selection call.
 */
export declare class AuthenticatorAaidMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The aaid of the {@link Authenticator}.
     */
    aaid: string;
    /**
     * Creates a new instance.
     *
     * @param operationId the identifier of the operation.
     * @param aaid the aaid of the {@link Authenticator}.
     */
    constructor(operationId: string, aaid: string);
}
//# sourceMappingURL=AuthenticatorAaidMessage.d.ts.map