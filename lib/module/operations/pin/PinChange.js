/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { PinChangeErrorConverter } from '../../error/pin/change/PinChangeErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { PinChangeMessage } from '../../model/messages/out/PinChangeMessage';
import { Operation } from '../Operation';

/**
 * The object that can be used to change the PIN.
 *
 * Usage example:
 * ```ts
 * class PinChangerImpl implements PinChanger {
 *     async changePin(context: PinChangeContext, handler: PinChangeHandler) {
 *         handler.pins(oldPin, newPin);
 *     }
 * }
 *
 * [...]
 * async pinChange({
 *     client: MobileAuthenticationClient,
 *     username: string,
 * }): Promise<void> {
 *     await client.operations.pinChange
 *         .username(username)
 *         .pinChanger(PinChangerImpl(...))
 *         .onSuccess(() {
 *             // handle success
 *         })
 *         .onError((error) {
 *             // handle error
 *         })
 *         .execute();
 * }
 * [...]
 * ```
 */
export class PinChange extends Operation {}
export class PinChangeImpl extends PinChange {
  username(username) {
    this._username = username;
    return this;
  }
  pinChanger(pinChanger) {
    this._pinChanger = pinChanger;
    return this;
  }
  onSuccess(onSuccess) {
    this._onSuccess = onSuccess;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  async execute() {
    var _this$_pinChanger;
    const operationId = uuid.v4();
    const operation = new UserInteractionPlatformOperationImpl(operationId, undefined, undefined, undefined, undefined, undefined, undefined, this._pinChanger);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new PinChangeMessage(operationId, this._pinChanger !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this._username, (_this$_pinChanger = this._pinChanger) === null || _this$_pinChanger === void 0 ? void 0 : _this$_pinChanger.pinPolicy);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.pinChange(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const pinChangeError = new PinChangeErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, pinChangeError);
    });
  }
}
//# sourceMappingURL=PinChange.js.map