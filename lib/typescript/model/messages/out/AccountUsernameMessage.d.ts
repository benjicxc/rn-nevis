/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the account selection operation platform channel call.
 */
export declare class AccountUsernameMessage implements ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The selected username.
     */
    username: string;
    /**
     * Default constructor for {@link AccountUsernameMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param username the selected username.
     */
    constructor(operationId: string, username: string);
}
//# sourceMappingURL=AccountUsernameMessage.d.ts.map