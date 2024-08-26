"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegistrationInfo = void 0;
var _Account = require("./Account");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object exposing the registration information for an {@link Authenticator}.
 */
class RegistrationInfo {
  /**
   * Returns the objects representing the accounts that are registered with this authenticator.
   *
   * If an authenticator that is registered for a given username is provided through
   * {@link AuthenticatorSelector} for registration operations associated with the account
   * associated with the username, an {@link OperationError} will be returned as a result
   * of the operation.
   *
   * If an authenticator that is not registered for a given username is provided through
   * {@link AuthenticatorSelector} for authentication operations associated with the account
   * associated with the username, an {@link OperationError} will be returned as a result
   * of the operation.
   */

  /**
   * Alternate constructor that creates a {@link RegistrationInfo} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link RegistrationInfo} instance.
   */
  static fromJson(json) {
    return RegistrationInfoImpl.fromJson(json);
  }

  /**
   * Returns `true` if the provided user is registered and `false` otherwise.
   *
   * @param username the username.
   * @returns `true` if the provided user is registered and `false` otherwise.
   */
}
exports.RegistrationInfo = RegistrationInfo;
class RegistrationInfoImpl extends RegistrationInfo {
  constructor(registeredAccounts) {
    super();
    this.registeredAccounts = registeredAccounts;
  }
  static fromJson(json) {
    const registeredAccounts = json.registeredAccounts;
    const accounts = registeredAccounts.map(element => _Account.Account.fromJson(element));
    return new RegistrationInfoImpl(accounts);
  }
  isRegistered(username) {
    return this.registeredAccounts.filter(account => {
      return account.username === username;
    }).length > 0;
  }
}
//# sourceMappingURL=RegistrationInfo.js.map