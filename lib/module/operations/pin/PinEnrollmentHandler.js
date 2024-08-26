/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinEnrollMessage } from '../../model/messages/out/PinEnrollMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The object handling the PIN to be enrolled.
 *
 * @see {@link PinEnroller.enrollPin}
 */
export class PinEnrollmentHandler extends CancellableHandler {}
export class PinEnrollmentHandlerImpl extends PinEnrollmentHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async pin(pin) {
    const message = new PinEnrollMessage(this._operationId, pin);
    return NevisMobileAuthenticationSdkReact.pinEnroll(message);
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=PinEnrollmentHandler.js.map