"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountSelectionHandlerImpl = exports.AccountSelectionHandler = void 0;
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _AccountUsernameMessage = require("../../model/messages/out/AccountUsernameMessage");
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _CancellableHandler = require("../../operations/CancellableHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The objects consuming the outcome of an interaction where the user chooses the account to be used.
 *
 * @see {@link AccountSelector.selectAccount}
 */
class AccountSelectionHandler extends _CancellableHandler.CancellableHandler {}
exports.AccountSelectionHandler = AccountSelectionHandler;
class AccountSelectionHandlerImpl extends AccountSelectionHandler {
  constructor(operationId) {
    super();
    this.operationId = operationId;
  }
  async username(username) {
    const message = new _AccountUsernameMessage.AccountUsernameMessage(this.operationId, username);
    return _MobileAuthenticationSdk.default.accountUsername(message);
  }
  cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this.operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.AccountSelectionHandlerImpl = AccountSelectionHandlerImpl;
//# sourceMappingURL=AccountSelectionHandler.js.map