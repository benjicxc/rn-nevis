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
import { RegistrationMessage } from '../model/messages/out/RegistrationMessage';

/**
 * The object that can be used to trigger a registration operation.
 *
 * Usage example:
 * ```ts
 *   class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *       async selectAuthenticator(
 *           context: AuthenticatorSelectionContext,
 *           handler: AuthenticatorSelectionHandler
 *       ): Promise<void> {
 *           await handler.aaid(aaid).catch(console.error);
 *       }
 *   }
 *
 *   class BiometricUserVerifierImpl extends BiometricUserVerifier {
 *       async verifyBiometric(
 *           context: BiometricUserVerificationContext,
 *           handler: BiometricUserVerificationHandler
 *       ): Promise<void> {
 *           await handler
 *               .listenForOsCredentials(
 *                   BiometricPromptOptions.create(
 *                       'Biometric authentication required',
 *                       'Cancel',
 *                       'Please identify yourself.'
 *                   )
 *               )
 *               .catch(console.error);
 *       }
 *   }
 *
 *   async register(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       deviceInformation: DeviceInformation
 *    ): Promise<void> {
 *       await client.operations.registration
 *           .username(username)
 *           .deviceInformation(deviceInformation)
 *           .authenticatorSelector(new AuthenticatorSelectorImpl())
 *           .biometricUserVerifier(new BiometricUserVerifierImpl())
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *    }
 * ```
 *
 * The biometric and Device Passcode authenticators are enrolled at the OS level. That is why, if one
 * of them must be registered, the user must authenticate through {@link BiometricUserVerifier},
 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier}. In the case of the PIN,
 * the PIN is enrolled during registration, so no authentication is needed.
 *
 * @see {@link Operations.registration}
 */
export class Registration extends HttpOperation {}
export class RegistrationImpl extends HttpOperationImpl {
  username(username) {
    this._username = username;
    return this;
  }
  serverUrl(serverUrl) {
    this._serverUrl = serverUrl;
    return this;
  }
  deviceInformation(deviceInformation) {
    this._deviceInformation = deviceInformation;
    return this;
  }
  authorizationProvider(authorizationProvider) {
    this._authorizationProvider = authorizationProvider;
    return this;
  }
  allowClass2AndroidSensors(allowClass2AndroidSensors) {
    this._allowClass2AndroidSensors = allowClass2AndroidSensors;
    return this;
  }
  allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback) {
    this._allowDevicePasscodeAsFallback = allowDevicePasscodeAsFallback;
    return this;
  }
  invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics) {
    this._invalidateOnNewOsBiometrics = invalidateOnNewOsBiometrics;
    return this;
  }
  authenticatorSelector(authenticatorSelector) {
    this._authenticatorSelector = authenticatorSelector;
    return this;
  }
  pinEnroller(pinEnroller) {
    this._pinEnroller = pinEnroller;
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
    var _this$_pinEnroller;
    const operationId = uuid.v4();
    const operation = new UserInteractionPlatformOperationImpl(operationId, this._authenticatorSelector, undefined, this._biometricUserVerifier, this._devicePasscodeUserVerifier, this._fingerprintUserVerifier, undefined, undefined, this._pinEnroller);
    PlatformOperationCache.getInstance().put(operation);
    NativeEventListener.getInstance().start();
    const message = new RegistrationMessage(operationId, false, this._authenticatorSelector !== undefined, this._pinEnroller !== undefined, false, this._biometricUserVerifier !== undefined, this._devicePasscodeUserVerifier !== undefined, this._fingerprintUserVerifier !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._username, this._serverUrl, this._deviceInformation, this._authorizationProvider, (_this$_pinEnroller = this._pinEnroller) === null || _this$_pinEnroller === void 0 ? void 0 : _this$_pinEnroller.pinPolicy, this._allowClass2AndroidSensors, this._allowDevicePasscodeAsFallback, this._invalidateOnNewOsBiometrics);
    function finish() {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(operationId);
    }
    return NevisMobileAuthenticationSdkReact.inBandRegister(message).then(() => {
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
//# sourceMappingURL=Registration.js.map