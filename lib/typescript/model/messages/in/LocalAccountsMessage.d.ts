/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { Account } from '../../../localData/Account';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the local accounts native event.
 */
export declare class LocalAccountsMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The list of the registered accounts.
     */
    accounts: Array<Account>;
    /**
     * Default constructor for {@link LocalAccountsMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param accounts the list of the registered accounts.
     */
    private constructor();
    /**
     * Alternate constructor that creates a {@link LocalAccountsMessage} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): LocalAccountsMessage;
}
//# sourceMappingURL=LocalAccountsMessage.d.ts.map