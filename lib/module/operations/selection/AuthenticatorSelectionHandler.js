/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { AuthenticatorAaidMessage } from '../../model/messages/out/AuthenticatorAaidMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The objects consuming the outcome of an interaction where the user chooses the authenticator to
 * be used.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
export class AuthenticatorSelectionHandler extends CancellableHandler {}
export class AuthenticatorSelectionHandlerImpl extends AuthenticatorSelectionHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async aaid(aaid) {
    const message = new AuthenticatorAaidMessage(this._operationId, aaid);
    return NevisMobileAuthenticationSdkReact.authenticatorAaid(message);
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=AuthenticatorSelectionHandler.js.map