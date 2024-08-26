/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import { OperationErrorConverter } from '../../error/operation/OperationErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OutOfBandRegistrationMessage } from '../../model/messages/out/OutOfBandRegistrationMessage';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';
/**
 * The operation handling an out-of-band registration. This is the object returned by the SDK, when
 * an {@link OutOfBandPayload} was processed and the {@link OutOfBandPayload} corresponds to a
 * registration operation.
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
 *   async registerWithOutOfBand(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload,
 *       deviceInformation: DeviceInformation
 *   ): Promise<void> {
 *        await client.operations.outOfBandOperation
 *            .payload(payload)
 *            .onRegistration((registration) => {
 *                registration
 *                    .deviceInformation(deviceInformation)
 *                    .authenticatorSelector(new AuthenticatorSelectorImpl())
 *                    .biometricUserVerifier(new BiometricUserVerifierImpl())
 *                    .onSuccess(() => {
 *                        // handle success
 *                    })
 *                    .onError((_error) => {
 *                        // handle error
 *                    })
 *                    .execute();
 *            })
 *            .onAuthentication((authentication) => {
 *                // handle authentication
 *            })
 *            .onError((_error) => {
 *                // handle out-of-band error
 *            })
 *            .execute();
 *   }
 * ```
 *
 * The biometric and Device Passcode authenticators are enrolled at the OS level. That is why, if one
 * of them must be registered, the user must authenticate through {@link BiometricUserVerifier},
 * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier}. In the case of the PIN,
 * the PIN is enrolled during registration, so no authentication is needed.
 *
 * @see {@link OutOfBandOperation.onRegistration}
 */
export class OutOfBandRegistration extends HttpOperation {}
export class OutOfBandRegistrationImpl extends HttpOperationImpl {
  constructor(operationId) {
    super();
    this.operationId = operationId;
  }
  deviceInformation(deviceInformation) {
    this._deviceInformation = deviceInformation;
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
    const operation = new UserInteractionPlatformOperationImpl(this.operationId, this._authenticatorSelector, undefined, this._biometricUserVerifier, this._devicePasscodeUserVerifier, this._fingerprintUserVerifier, undefined, undefined, this._pinEnroller);

    /// IMPORTANT: no need to start event listening
    /// since it is started by OutOfBandOperation already
    PlatformOperationCache.getInstance().put(operation);
    const message = new OutOfBandRegistrationMessage(this.operationId, false, this._authenticatorSelector !== undefined, this._pinEnroller !== undefined, false, this._biometricUserVerifier !== undefined, this._devicePasscodeUserVerifier !== undefined, this._fingerprintUserVerifier !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders, this._deviceInformation, (_this$_pinEnroller = this._pinEnroller) === null || _this$_pinEnroller === void 0 ? void 0 : _this$_pinEnroller.pinPolicy, this._allowClass2AndroidSensors, this._allowDevicePasscodeAsFallback, this._invalidateOnNewOsBiometrics);
    const finish = () => {
      NativeEventListener.getInstance().stop();
      PlatformOperationCache.getInstance().delete(this.operationId);
    };
    return NevisMobileAuthenticationSdkReact.oobRegister(message).then(() => {
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
//# sourceMappingURL=OutOfBandRegistration.js.map