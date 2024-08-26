/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { CancellableHandler } from '../../operations/CancellableHandler';
/**
 * The objects consuming the outcome of an interaction where the user chooses the account to be used.
 *
 * @see {@link AccountSelector.selectAccount}
 */
export declare abstract class AccountSelectionHandler extends CancellableHandler {
    /**
     * Provides the username of the account selected by the user.
     *
     * @param username the username of the selected account.
     */
    abstract username(username: string): Promise<void>;
}
export declare class AccountSelectionHandlerImpl extends AccountSelectionHandler {
    operationId: string;
    constructor(operationId: string);
    username(username: string): Promise<void>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=AccountSelectionHandler.d.ts.map