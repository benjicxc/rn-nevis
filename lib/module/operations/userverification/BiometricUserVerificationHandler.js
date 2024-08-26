/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OsAuthenticationListenHandlerImpl } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { ListenForOsCredentialsMessage } from '../../model/messages/out/ListenForOsCredentialsMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { TypedBiometricPromptOptions } from '../../model/typed/TypedPromptOptions';

/**
 * The objects consuming the outcome of an interaction where the user provides biometric credentials.
 *
 * This is used with the {@link Aaid.BIOMETRIC} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link BiometricUserVerifier.verifyBiometric}
 */
export class BiometricUserVerificationHandler extends UserVerificationHandler {}
export class BiometricUserVerificationHandlerImpl extends BiometricUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
    this._listenForOsCredentials = new OsAuthenticationListenHandlerImpl(operationId);
  }
  async listenForOsCredentials(biometricOptions) {
    const typedBiometricPromptOptions = new TypedBiometricPromptOptions(biometricOptions);
    const message = new ListenForOsCredentialsMessage(this._operationId, typedBiometricPromptOptions);
    return NevisMobileAuthenticationSdkReact.listenForOsCredentials(message).then(() => {
      return this._listenForOsCredentials;
    });
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=BiometricUserVerificationHandler.js.map