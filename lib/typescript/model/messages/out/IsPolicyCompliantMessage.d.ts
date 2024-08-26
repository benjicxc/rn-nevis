/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the policy compliant call.
 */
export declare class IsPolicyCompliantMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The aaid of the {@link Authenticator}.
     */
    aaid: string;
    /**
     * The username of the account.
     */
    username?: string;
    /**
     *
     * @param operationId the identifier of the operation.
     * @param aaid the aaid of the {@link Authenticator}.
     * @param username the username of the account.
     */
    constructor(operationId: string, aaid: string, username?: string);
}
//# sourceMappingURL=IsPolicyCompliantMessage.d.ts.map