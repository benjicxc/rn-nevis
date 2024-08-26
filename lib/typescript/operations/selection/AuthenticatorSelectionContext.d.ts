/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { Account } from '../../localData/Account';
import { Authenticator } from '../../localData/Authenticator';
/**
 * The service returning the information required to choose the authenticator to be used.
 *
 * It returns all the available authenticators, the operation being executed and also informs
 * whether a given authenticator is compliant with the policy required by the FIDO UAF server for
 * the ongoing operation.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
export declare abstract class AuthenticatorSelectionContext {
    /**
     * The account used to execute the operation.
     */
    abstract account: Account;
    /**
     * The available authenticators. Note that this may also include authenticators that cannot be
     * used to complete the operation.
     *
     * All the available authenticators are returned so that the users of the SDK can figure out
     * not only whether an authenticator can be used for the operation, but also why.
     *
     * For example, a developer would like to give a visual hint explaining why the Fingerprint
     * authenticator cannot be used during registration if it is not enrolled: by using
     * {@link Authenticator.userEnrollment} this situation can be identified during registration
     * and then some message can be displayed to the user informing that a fingerprint must be
     * defined in the OS settings to be able to register the fingerprint authenticator.
     * In the case where a user registers two authenticators, but the server's policy only allows to
     * use PIN in a given authentication operation, @{link isPolicyCompliant} can be used to identify this
     * situation and to inform the user why the fingerprint authenticator is not available.
     */
    abstract authenticators: Array<Authenticator>;
    /**
     * The transaction confirmation data, if any, to be presented to the user for verification.
     *
     * If this data is present, data must be presented to the user before authenticating.
     * Note that in the case of registration or authentication not involving transaction
     * confirmation, this is typically empty and thus, it does not require handling.
     * The contents are the base64 URL decoded contents of the Transaction as described in the
     * FIDO UAF specification.
     */
    abstract transactionConfirmationData?: string;
    /**
     * Returns whether the provided authenticator is compliant with the policy of the server.
     *
     * If an authenticator that is not policy compliant is provided through
     * {@link AuthenticatorSelectionHandler.aaid} for registration or authentication operations,
     * {@link FidoErrorCodeType.NoSuitableAuthenticator} will be returned as a result of the operation.
     *
     * @param aaid the AAID of the {@link Authenticator}.
     * @returns true if the authenticator is compliant with the policy, and false otherwise.
     */
    abstract isPolicyCompliant(aaid: string): Promise<boolean>;
    /**
     * Alternate constructor that creates an instance from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): AuthenticatorSelectionContext;
}
export declare class AuthenticatorSelectionContextImpl extends AuthenticatorSelectionContext {
    operationId: string;
    account: Account;
    authenticators: Array<Authenticator>;
    transactionConfirmationData?: string;
    private constructor();
    static fromJson(json: any): AuthenticatorSelectionContextImpl;
    isPolicyCompliant(aaid: string): Promise<boolean>;
}
//# sourceMappingURL=AuthenticatorSelectionContext.d.ts.map