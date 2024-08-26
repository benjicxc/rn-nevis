/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { DeviceInformationChangeErrorConverter } from '../error/deviceInformationChange/DeviceInformationChangeErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { DeviceInformationChangeMessage } from '../model/messages/out/DeviceInformationChangeMessage';

/**
 * The object that changes the device information.
 *
 * The device information change can be used to
 *  - modify the name of the device and/or
 *  - modify its Firebase registration token or
 *  - disable push notifications.
 *
 * If neither {@link name} or {@link fcmRegistrationToken} are provided, the provided {@link onSuccess}
 * callback will be executed when {@link execute} is invoked.
 *
 * Usage example for changing device information:
 * ```ts
 *   [...]
 *   async updateDeviceInformation(
 *       client: MobileAuthenticationClient,
 *       newName: string,
 *       fcmToken: string
 *   ): Promise<void> {
 *       await client.operations.deviceInformationChange
 *           .name(newName)
 *           .fcmRegistrationToken(fcmToken)
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
export class DeviceInformationChange extends HttpOperation {}
export class DeviceInformationChangeImpl extends HttpOperationImpl {
  name(name) {
    this._name = name;
    return this;
  }
  fcmRegistrationToken(fcmRegistrationToken) {
    this._fcmRegistrationToken = fcmRegistrationToken;
    return this;
  }
  disablePushNotifications() {
    this._disablePushNotifications = true;
    return this;
  }
  retryPolicy(retryPolicy) {
    this._retryPolicy = retryPolicy;
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
    const operationId = uuid.v4();
    const operation = new UserInteractionPlatformOperationImpl(operationId);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new DeviceInformationChangeMessage(operationId, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._name, this._fcmRegistrationToken, this._disablePushNotifications, this._retryPolicy);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.deviceInformationChange(message).then(() => {
      var _this$_onSuccess;
      finish();
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this);
    }).catch(error => {
      var _this$_onError;
      finish();
      const deviceInformationChangeError = new DeviceInformationChangeErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, deviceInformationChangeError);
    });
  }
}
//# sourceMappingURL=DeviceInformationChange.js.map