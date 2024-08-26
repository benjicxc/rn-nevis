/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
import { OutOfBandAuthenticationImpl } from './OutOfBandAuthentication';
import { OutOfBandRegistrationImpl } from './OutOfBandRegistration';
import { OutOfBandPlatformOperation, OutOfBandPlatformOperationType } from '../../cache/operation/OutOfBandPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { OutOfBandOperationErrorConverter } from '../../error/outOfBand/operation/OutOfBandOperationErrorConverter';
import { OutOfBandOperationUnknownError } from '../../error/outOfBand/operation/OutOfBandOperationUnknownError';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OutOfBandOperationMessage } from '../../model/messages/out/OutOfBandOperationMessage';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';

/**
 * The operation managing an {@link OutOfBandPayload}.
 *
 * An {@link OutOfBandPayload} can be provided through different means:
 *   - a push notification,
 *   - a QR code or
 *   - an application link.
 *
 * This operation will process the payload, decrypt it if needed and send it to the server. If the
 * payload is successfully handled by the server, then the SDK will identify whether the operation
 * associated with the payload is a registration or an authentication. Depending on that the
 * {@link onRegistration} or the {@link onAuthentication} will be invoked.
 *
 * Usage example:
 * ```ts
 * [...]
 *   async authenticateUsingOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *       await client.operations.outOfBandOperation
 *           .payload(payload)
 *           .onRegistration((registration) => {
 *               // handle registration
 *           })
 *           .onAuthentication((authentication) => {
 *               // handle authentication
 *           })
 *           .onError((_error) => {
 *               // handle out-of-band error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * @see
 * - {@link OutOfBandPayload}
 * - {@link OutOfBandRegistration}
 * - {@link OutOfBandAuthentication}
 */
export class OutOfBandOperation extends HttpOperation {}
export class OutOfBandOperationImpl extends HttpOperationImpl {
  payload(payload) {
    this._payload = payload;
    return this;
  }
  onRegistration(onRegistration) {
    this._onRegistration = onRegistration;
    return this;
  }
  onAuthentication(onAuthentication) {
    this._onAuthentication = onAuthentication;
    return this;
  }
  onError(onError) {
    this._onError = onError;
    return this;
  }
  async execute() {
    const operationId = uuid.v4();
    const subOperationId = uuid.v4();
    const onOperationType = type => {
      var _this$_onError;
      switch (type) {
        case OutOfBandPlatformOperationType.registration:
          {
            var _this$_onRegistration;
            const registration = new OutOfBandRegistrationImpl(subOperationId);
            (_this$_onRegistration = this._onRegistration) === null || _this$_onRegistration === void 0 || _this$_onRegistration.call(this, registration);
            break;
          }
        case OutOfBandPlatformOperationType.authentication:
          {
            var _this$_onAuthenticati;
            const authentication = new OutOfBandAuthenticationImpl(subOperationId);
            (_this$_onAuthenticati = this._onAuthentication) === null || _this$_onAuthenticati === void 0 || _this$_onAuthenticati.call(this, authentication);
            break;
          }
        default:
          (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, new OutOfBandOperationUnknownError(`Unsupported out-of-band operation type (${type}).`));
      }
    };
    const operation = new OutOfBandPlatformOperation(operationId, onOperationType);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new OutOfBandOperationMessage(operationId, subOperationId, false, this.onError !== undefined, this.httpRequestHeaders, this._payload, this._onRegistration !== undefined, this._onAuthentication !== undefined);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.oobOperation(message).then(() => finish()).catch(error => {
      var _this$_onError2;
      finish();
      const operationError = new OutOfBandOperationErrorConverter(error).convert();
      (_this$_onError2 = this._onError) === null || _this$_onError2 === void 0 || _this$_onError2.call(this, operationError);
    });
  }
}
//# sourceMappingURL=OutOfBandOperation.js.map