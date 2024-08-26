/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { AuthenticatorSelectionContext } from './AuthenticatorSelectionContext';
import type { AuthenticatorSelectionHandler } from './AuthenticatorSelectionHandler';
/**
 * The object in charge of selecting the authenticator to be used to perform an operation.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see
 * - {@link Registration.authenticatorSelector}
 * - {@link Authentication.authenticatorSelector}
 * - {@link AuthCloudApiRegistration.authenticatorSelector}
 * - {@link OutOfBandRegistration.authenticatorSelector}
 * - {@link OutOfBandAuthentication.authenticatorSelector}
 */
export declare abstract class AuthenticatorSelector {
    /**
     * The authenticator selection interaction.
     *
     * The implementing class must ask the user to choose one of the authenticators exposed by the
     * {@link AuthenticatorSelectionContext} and provide the choice to the {@link AuthenticatorSelectionHandler}.
     *
     * Note, that in the case of transaction confirmation (which can be considered a special case of
     * authentication) the implementing classes must present the contents of the transaction (if any)
     * to the user for verification (see {@link AuthenticatorSelectionContext.transactionConfirmationData}).
     *
     * @param context the object containing the list of existing authenticators.
     * @param handler the object that is notified of the selection result.
     */
    abstract selectAuthenticator(context: AuthenticatorSelectionContext, handler: AuthenticatorSelectionHandler): void;
}
//# sourceMappingURL=AuthenticatorSelector.d.ts.map