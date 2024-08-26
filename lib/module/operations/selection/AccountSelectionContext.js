/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Account } from './../../localData/Account';
import { Authenticator } from './../../localData/Authenticator';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { IsPolicyCompliantMessage } from '../../model/messages/out/IsPolicyCompliantMessage';

/**
 * The service returning the information required to choose the account to be used.
 *
 * It returns all the available accounts and authenticators and also informs
 * whether a given authenticator is compliant with the policy required by the
 * FIDO UAF server for the ongoing operation.
 *
 * @see {@link AccountSelector.selectAccount}
 */
export class AccountSelectionContext {
  /**
   * The accounts that have been registered with the SDK.
   */

  /**
   * The available authenticators.
   *
   * Note that this may also include authenticators that cannot be used to
   * complete the operation.
   *
   * All the available authenticators are returned so that the users of the SDK
   * can figure out not only whether an account authenticator can be used for
   * the operation, but also why. For example, a developer would like to give a
   * visual hint explaining why the Fingerprint authenticator for a given user
   * cannot be used during authentication if it is not registered: by using
   * {@link Authenticator.registration | Authenticator.registration} this situation can be identified.
   *
   * The following snippet can be used to identify whether the authenticator can
   * be used or not with a given account (identified by its username):
   *
   *     _isValid(
   *       authenticator: Authenticator,
   *       username: string,
   *       context: AccountSelectionContext,
   *     ): boolean {
   *         let registration: Registration = authenticator.registration;
   *         // This method will filter the authenticators that are no supported
   *         // by the hardware, those not registered, and those that are compliant
   *         // with the server policy.
   *         return registration.isRegistered(username) &&
   *           authenticator.isSupportedByHardware &&
   *           context.isPolicyCompliant(authenticator.aaid);
   *     }
   *
   * Returns all the available authenticators.
   * @see {@link Authenticator.registration}, {@link Authenticator.isSupportedByHardware}, {@link isPolicyCompliant}
   */

  /**
   * Returns whether the specified account with the provided authenticator is
   * compliant with the policy of the server.
   *
   * If a username without an authenticator that is policy compliant is provided
   * through {@link AccountSelectionHandler.username}, a {@link FidoErrorCode} with
   * {@link FidoErrorCodeType.NoSuitableAuthenticator} will be returned as a result
   * of the operation.
   *
   * To know if a given account has at least one policy compliant authenticator,
   * the following code can be used:
   *
   *     async hasPolicyCompliantAuthenticator(accountUsername: string): boolean {
   *       authenticators.forEach((authenticator) {
   *         if (await isPolicyCompliant(authenticator.aaid, accountUsername)) {
   *                 return true;
   *             }
   *        });
   *        return false;
   *     }
   *
   * @param authenticatorAaid the AAID of the {@link Authenticator}.
   * @param username the username of the account.
   *
   * @returns true if the authenticator is compliant with the policy, and false
   * otherwise.
   */

  /**
   * The transaction confirmation data, if any, to be presented to the user for
   * verification.
   *
   * If this data is present, data must be presented to the user before authenticating.
   *
   * Basic implementation layout:
   *
   *     void selectAuthenticator(
   *       context: AuthenticatorSelectionContext,
   *       handler: AuthenticatorSelectionHandler,
   *     ) {
   *         if (context.transactionConfirmationData != null) {
   *             showTransactionMessage(context.transactionConfirmationData!,
   *             (userConfirmed) => {
   *                 if (userConfirmed) {
   *                     selectAuthenticator(context, handler);
   *                 }
   *                 else {
   *                     // Cancel the operation if the transaction was rejected
   *                     handler.cancel();
   *                 }
   *             });
   *         } else {
   *             // No transaction confirmation,
   *             // just proceed to authenticator selection
   *             selectAuthenticator(context, handler);
   *         }
   *     }
   *
   *     void _showTransactionMessage(transactionConfirmationData: string,
   *             Handler<boolean> confirmationHandler) {
   *         // Display the transaction confirmation data and ask the user to
   *         // confirm it. Then invoke confirmationHandler with the result of
   *         // the confirmation:
   *         // confirmationHandler.accept(confirmation);
   *     }
   *
   *
   * Note that in the case of registration or authentication not involving
   * transaction confirmation, this is typically empty and thus, it does not
   * require handling.
   *
   * The contents are the base64 URL decoded contents of the Transaction as
   * described in the {@link https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-protocol-v1.1-ps-20170202.html#idl-def-Transaction | FIDO UAF specification}.
   */

  /**
   * Alternate constructor that creates {@link AccountSelectionContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link AccountSelectionContext} instance.
   */
  static fromJson(json) {
    return AccountSelectionContextImpl.fromJson(json);
  }
}
export class AccountSelectionContextImpl extends AccountSelectionContext {
  constructor(operationId, accounts, authenticators, transactionConfirmationData) {
    super();
    this.operationId = operationId;
    this.accounts = accounts;
    this.authenticators = authenticators;
    this.transactionConfirmationData = transactionConfirmationData;
  }
  static fromJson(json) {
    const accounts = json.accounts.map(element => Account.fromJson(element));
    const authenticators = json.authenticators.map(element => Authenticator.fromJson(element));
    return new AccountSelectionContextImpl(json.operationId, accounts, authenticators, json.transactionConfirmationData);
  }
  async isPolicyCompliant(aaid, username) {
    const message = new IsPolicyCompliantMessage(this.operationId, aaid, username);
    return await NevisMobileAuthenticationSdkReact.isPolicyCompliant(message).then(result => {
      return result.isPolicyCompliant;
    });
  }
}
//# sourceMappingURL=AccountSelectionContext.js.map