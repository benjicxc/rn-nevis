"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;
var _Server = require("./Server");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object representing a user account.
 *
 * An `Account` is created when a FIDO UAF registration is completed successfully.
 */
class Account {
  /**
   * The username associated with the {@link Account}. This is a unique identifier.
   * Depending on the backend, the username can be a UUID, an email or a login ID.
   * `username` is used because it matches the nomenclature used in the FIDO UAF
   * specification to refer to a user unique identifier.
   *
   * The SDK does not support having identities with the same `username` defined
   * in different servers. So, the `username` is unique among the identities in
   * all servers.
   */

  /**
   * The object describing the server where the account is defined.
   */

  /**
   * Alternate constructor that creates an {@link Account} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns an {@link Account} instance.
   */
  static fromJson(json) {
    return AccountImpl.fromJson(json);
  }
}
exports.Account = Account;
class AccountImpl extends Account {
  constructor(username, server) {
    super();
    this.username = username;
    this.server = server;
  }
  static fromJson(json) {
    const server = _Server.Server.fromJson(json.server);
    return new AccountImpl(json.username, server);
  }
}
//# sourceMappingURL=Account.js.map