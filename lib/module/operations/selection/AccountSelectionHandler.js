/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { AccountUsernameMessage } from '../../model/messages/out/AccountUsernameMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { CancellableHandler } from '../../operations/CancellableHandler';

/**
 * The objects consuming the outcome of an interaction where the user chooses the account to be used.
 *
 * @see {@link AccountSelector.selectAccount}
 */
export class AccountSelectionHandler extends CancellableHandler {}
export class AccountSelectionHandlerImpl extends AccountSelectionHandler {
  constructor(operationId) {
    super();
    this.operationId = operationId;
  }
  async username(username) {
    const message = new AccountUsernameMessage(this.operationId, username);
    return NevisMobileAuthenticationSdkReact.accountUsername(message);
  }
  cancel() {
    const message = new OperationIdMessage(this.operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=AccountSelectionHandler.js.map