/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinsChangeMessage } from '../../model/messages/out/PinsChangeMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The object handling the old and new PIN provided by the end-user.
 *
 * @see {@link PinChanger.changePin}
 */
export class PinChangeHandler extends CancellableHandler {}
export class PinChangeHandlerImpl extends PinChangeHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async pins(oldPin, newPin) {
    const message = new PinsChangeMessage(this._operationId, oldPin, newPin);
    return NevisMobileAuthenticationSdkReact.pinsChange(message);
  }
  cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=PinChangeHandler.js.map