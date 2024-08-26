/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinVerificationMessage } from '../../model/messages/out/PinVerificationMessage';

/**
 * The objects consuming the outcome of an interaction where the user provides
 * PIN credentials.
 *
 * This is used with the {@link Aaid.PIN} authenticator attestation identifier.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
export class PinUserVerificationHandler extends UserVerificationHandler {}
export class PinUserVerificationHandlerImpl extends PinUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async verifyPin(pin) {
    const message = new PinVerificationMessage(this._operationId, pin);
    return NevisMobileAuthenticationSdkReact.pinVerify(message);
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=PinUserVerificationHandler.js.map