/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';

/**
 * An object that can be used to resume listening for OS credentials (i.e. fingerprint, face recognition)
 * and to cancel the whole operation while listening for credentials.
 *
 * This is used with {@link Aaid.BIOMETRIC}, {@link Aaid.DEVICE_PASSCODE} and {@link Aaid.FINGERPRINT}
 * authenticator attestation identifier.
 *
 * @see
 * - {@link BiometricUserVerificationHandler.listenForOsCredentials}
 * - {@link FingerprintUserVerificationHandler.listenForOsCredentials}
 */
export class OsAuthenticationListenHandler {}
export class OsAuthenticationListenHandlerImpl extends OsAuthenticationListenHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async cancelAuthentication() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancelAuthentication(message);
  }
  async pauseListening() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.pauseListening(message).then(() => {
      return this;
    });
  }
  async resumeListening() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.resumeListening(message).then(() => {
      return this;
    });
  }
}
//# sourceMappingURL=OsAuthenticationListenHandler.js.map