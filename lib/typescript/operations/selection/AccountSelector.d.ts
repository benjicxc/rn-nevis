/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { AccountSelectionContext } from './AccountSelectionContext';
import type { AccountSelectionHandler } from './AccountSelectionHandler';
/**
 * The object in charge of selecting an account.
 *
 * This interface must be implemented by the user of the SDK only when
 * username-less out-of-band authentication is required with multiple accounts.
 *
 * @see {@link OutOfBandAuthentication.accountSelector}
 */
export declare abstract class AccountSelector {
    /**
     * The account selection interaction.
     *
     * The implementing class must ask the user to choose one of the accounts
     * exposed by the {@link AccountSelectionContext} and provide the choice to the
     * {@link AccountSelectionHandler}.
     *
     * @param context the object containing the list of existing authenticators.
     * @param handler the object that must be notified with the selection result.
     */
    abstract selectAccount(context: AccountSelectionContext, handler: AccountSelectionHandler): void;
}
//# sourceMappingURL=AccountSelector.d.ts.map