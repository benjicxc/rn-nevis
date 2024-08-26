/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { OperationErrorConverter } from '../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { DeregistrationMessage } from '../model/messages/out/DeregistrationMessage';

/**
 * The object that can be used to trigger a deregistration operation.
 *
 * Usage example:
 * ```ts
 *   [...]
 *   async deregister(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       aaid: string
 *   ): Promise<void> {
 *       await client.operations.deregistration
 *           .username(username)
 *           .aaid(aaid)
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *   }
 *   [...]
 * ```
 */
export class Deregistration extends HttpOperation {}
export class DeregistrationImpl extends HttpOperationImpl {
  aaid(aaid) {
    this._aaid = aaid;
    return this;
  }
  username(username) {
    this._username = username;
    return this;
  }
  authorizationProvider(authorizationProvider) {
    this._authorizationProvider = authorizationProvider;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  onSuccess(onSuccess) {
    this._onSuccess = onSuccess;
    return this;
  }
  async execute() {
    const operationId = uuid.v4();
    const operation = new UserInteractionPlatformOperationImpl(operationId);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new DeregistrationMessage(operationId, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._authorizationProvider, this._username, this._aaid);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.deregister(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const operationError = new OperationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, operationError);
    });
  }
}
//# sourceMappingURL=Deregistration.js.map