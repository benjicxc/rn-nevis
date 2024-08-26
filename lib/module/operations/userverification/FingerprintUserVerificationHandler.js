/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OsAuthenticationListenHandlerImpl } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { ListenForOsCredentialsMessage } from '../../model/messages/out/ListenForOsCredentialsMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';

/**
 * The objects consuming the outcome of an interaction where the user provides fingerprint credentials.
 *
 * This is used with the {@link Aaid.FINGERPRINT} authenticator attestation identifier.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
export class FingerprintUserVerificationHandler extends UserVerificationHandler {}
export class FingerprintUserVerificationHandlerImpl extends FingerprintUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
    this._listenForOsCredentials = new OsAuthenticationListenHandlerImpl(operationId);
  }
  async listenForOsCredentials() {
    const message = new ListenForOsCredentialsMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.listenForOsCredentials(message).then(() => {
      return this._listenForOsCredentials;
    });
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=FingerprintUserVerificationHandler.js.map