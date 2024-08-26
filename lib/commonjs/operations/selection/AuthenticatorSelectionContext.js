"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticatorSelectionContextImpl = exports.AuthenticatorSelectionContext = void 0;
var _Account = require("../../localData/Account");
var _Authenticator = require("../../localData/Authenticator");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _IsPolicyCompliantMessage = require("../../model/messages/out/IsPolicyCompliantMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The service returning the information required to choose the authenticator to be used.
 *
 * It returns all the available authenticators, the operation being executed and also informs
 * whether a given authenticator is compliant with the policy required by the FIDO UAF server for
 * the ongoing operation.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
class AuthenticatorSelectionContext {
  /**
   * The account used to execute the operation.
   */

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

  /**
   * The transaction confirmation data, if any, to be presented to the user for verification.
   *
   * If this data is present, data must be presented to the user before authenticating.
   * Note that in the case of registration or authentication not involving transaction
   * confirmation, this is typically empty and thus, it does not require handling.
   * The contents are the base64 URL decoded contents of the Transaction as described in the
   * FIDO UAF specification.
   */

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

  /**
   * Alternate constructor that creates an instance from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    return AuthenticatorSelectionContextImpl.fromJson(json);
  }
}
exports.AuthenticatorSelectionContext = AuthenticatorSelectionContext;
class AuthenticatorSelectionContextImpl extends AuthenticatorSelectionContext {
  constructor(operationId, account, authenticators, transactionConfirmationData) {
    super();
    this.operationId = operationId;
    this.account = account;
    this.authenticators = authenticators;
    this.transactionConfirmationData = transactionConfirmationData;
  }
  static fromJson(json) {
    const operationId = json.operationId;
    const account = _Account.Account.fromJson(json.account);
    const authenticators = json.authenticators.map(element => _Authenticator.Authenticator.fromJson(element));
    const transactionConfirmationData = json.transactionConfirmationData;
    return new AuthenticatorSelectionContextImpl(operationId, account, authenticators, transactionConfirmationData);
  }
  async isPolicyCompliant(aaid) {
    const message = new _IsPolicyCompliantMessage.IsPolicyCompliantMessage(this.operationId, aaid);
    return await _MobileAuthenticationSdk.default.isPolicyCompliant(message).then(result => {
      return result.isPolicyCompliant;
    });
  }
}
exports.AuthenticatorSelectionContextImpl = AuthenticatorSelectionContextImpl;
//# sourceMappingURL=AuthenticatorSelectionContext.js.map