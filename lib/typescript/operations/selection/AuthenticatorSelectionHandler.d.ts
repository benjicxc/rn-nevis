/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { CancellableHandler } from '../CancellableHandler';
/**
 * The objects consuming the outcome of an interaction where the user chooses the authenticator to
 * be used.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
export declare abstract class AuthenticatorSelectionHandler extends CancellableHandler {
    /**
     * Provides the AAID of the authenticator selected by the user.
     *
     * @param aaid the AAID of the selected authenticator.
     */
    abstract aaid(aaid: string): Promise<void>;
}
export declare class AuthenticatorSelectionHandlerImpl extends AuthenticatorSelectionHandler {
    private readonly _operationId;
    constructor(operationId: string);
    aaid(aaid: string): Promise<void>;
    cancel(): Promise<void>;
}
//# sourceMappingURL=AuthenticatorSelectionHandler.d.ts.map