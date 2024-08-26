/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { AuthenticationErrorConverter } from '../error/authentication/AuthenticationErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { OnSuccessMessage } from '../model/messages/in/OnSuccessMessage';
import { AuthenticationMessage } from '../model/messages/out/AuthenticationMessage';
/**
 * The object that can be used to trigger an authentication operation.
 *
 * Usage example:
 * ```ts
 *  class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *      async selectAuthenticator(
 *          context: AuthenticatorSelectionContext,
 *          handler: AuthenticatorSelectionHandler,
 *      ): Promise<void> {
 *          await handler.aaid(aaid).catch(console.error);
 *      }
 *  }
 *
 *  class PinUserVerifierImpl extends PinUserVerifier {
 *      async verifyPin(
 *          context: PinUserVerificationContext,
 *          handler: PinUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyPin(pin).catch(console.error);
 *      }
 *  }
 *
 *  class BiometricUserVerifierImpl implements BiometricUserVerifier {
 *      async verifyBiometric(
 *          context: BiometricUserVerificationContext,
 *          handler: BiometricUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyBiometric().catch(console.error);
 *      }
 *  }
 *
 *  [...]
 *  async function authenticate(
 *      client: MobileAuthenticationClient,
 *      username: string,
 *      sessionProvider?: SessionProvider,
 *  ): Promise<void> {
 *      await client.operations.authentication
 *          .username(username)
 *          .sessionProvider(sessionProvider)
 *          .authenticatorSelector(AuthenticatorSelectorImpl(...))
 *          .pinUserVerifier(PinUserVerifierImpl(...))
 *          .biometricUserVerifier(BiometricUserVerifierImpl(...))
 *          .onSuccess((authorizationProvider) {
 *              // handle success
 *          })
 *          .onError((error) {
 *              // handle error
 *          })
 *          .execute();
 *  }
 *  [...]
 * ```
 */
export class Authentication extends HttpOperation {}
export class AuthenticationImpl extends HttpOperationImpl {
  username(username) {
    this._username = username;
    return this;
  }
  sessionProvider(sessionProvider) {
    this._sessionProvider = sessionProvider;
    return this;
  }
  retryPolicyObtainingAuthorizationProvider(retryPolicy) {
    this._retryPolicyObtainingAuthorizationProvider = retryPolicy;
    return this;
  }
  authenticatorSelector(authenticatorSelector) {
    this._authenticatorSelector = authenticatorSelector;
    return this;
  }
  pinUserVerifier(pinUserVerifier) {
    this._pinUserVerifier = pinUserVerifier;
    return this;
  }
  biometricUserVerifier(biometricUserVerifier) {
    this._biometricUserVerifier = biometricUserVerifier;
    return this;
  }
  devicePasscodeUserVerifier(devicePasscodeUserVerifier) {
    this._devicePasscodeUserVerifier = devicePasscodeUserVerifier;
    return this;
  }
  fingerprintUserVerifier(fingerprintUserVerifier) {
    this._fingerprintUserVerifier = fingerprintUserVerifier;
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
    const operation = new UserInteractionPlatformOperationImpl(operationId, this._authenticatorSelector, undefined, this._biometricUserVerifier, this._devicePasscodeUserVerifier, this._fingerprintUserVerifier, this._pinUserVerifier, undefined, undefined);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new AuthenticationMessage(operationId, this._authenticatorSelector !== undefined, this._pinUserVerifier !== undefined, this._biometricUserVerifier !== undefined, this._devicePasscodeUserVerifier !== undefined, this._fingerprintUserVerifier !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this._username, this._sessionProvider, this._retryPolicyObtainingAuthorizationProvider, this.httpRequestHeaders);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.authenticate(message).then(result => {
      var _this$_onSuccess;
      finish();
      const successMessage = OnSuccessMessage.fromJson(result);
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this, successMessage.authorizationProvider);
    }).catch(error => {
      var _this$_onError;
      finish();
      const authenticationError = new AuthenticationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, authenticationError);
    });
  }
}
//# sourceMappingURL=Authentication.js.map