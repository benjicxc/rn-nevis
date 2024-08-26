/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OsAuthenticationListenHandlerImpl } from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { ListenForOsCredentialsMessage } from '../../model/messages/out/ListenForOsCredentialsMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { TypedDevicePasscodePromptOptions } from '../../model/typed/TypedPromptOptions';

/**
 *
 * The objects consuming the outcome of an interaction where the user provides device passcode credentials.
 *
 * This is used with the {@link Aaid.DEVICE_PASSCODE} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link DevicePasscodeUserVerifier.verifyDevicePasscode}
 */
export class DevicePasscodeUserVerificationHandler extends UserVerificationHandler {}
export class DevicePasscodeUserVerificationHandlerImpl extends DevicePasscodeUserVerificationHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
    this._listenForOsCredentials = new OsAuthenticationListenHandlerImpl(operationId);
  }
  async listenForOsCredentials(devicePasscodePromptOptions) {
    const typedDevicePasscodePromptOptions = new TypedDevicePasscodePromptOptions(devicePasscodePromptOptions);
    const message = new ListenForOsCredentialsMessage(this._operationId, typedDevicePasscodePromptOptions);
    return NevisMobileAuthenticationSdkReact.listenForOsCredentials(message).then(() => {
      return this._listenForOsCredentials;
    });
  }
  async cancel() {
    const message = new OperationIdMessage(this._operationId);
    return NevisMobileAuthenticationSdkReact.cancel(message);
  }
}
//# sourceMappingURL=DevicePasscodeUserVerificationHandler.js.map