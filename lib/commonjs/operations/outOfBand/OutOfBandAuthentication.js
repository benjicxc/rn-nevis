"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandAuthenticationImpl = exports.OutOfBandAuthentication = void 0;
var _UserInteractionPlatformOperation = require("../../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../../cache/PlatformOperationCache");
var _OperationErrorConverter = require("../../error/operation/OperationErrorConverter");
var _NativeEventListener = require("../../event/NativeEventListener");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OnSuccessMessage = require("../../model/messages/in/OnSuccessMessage");
var _OutOfBandAuthenticationMessage = require("../../model/messages/out/OutOfBandAuthenticationMessage");
var _HttpOperation = require("../HttpOperation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The operation handling an out-of-band authentication.
 *
 * This is the object returned by the SDK, when an {@link OutOfBandPayload} was processed and the
 * {@link OutOfBandPayload} corresponds to an authentication operation.
 *
 * Usage example:
 * ```ts
 *   class AccountSelectorImpl extends AccountSelector {
 *       async selectAccount(
 *           context: AccountSelectionContext,
 *           handler: AccountSelectionHandler
 *       ): Promise<void> {
 *           await handler.username(username).catch(console.error);
 *       }
 *   }
 *
 *   class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *       async selectAuthenticator(
 *           context: AuthenticatorSelectionContext,
 *           handler: AuthenticatorSelectionHandler
 *       ): Promise<void> {
 *           await handler.aaid(aaid).catch(console.error);
 *       }
 *   }
 *
 *   class PinUserVerifierImpl extends PinUserVerifier {
 *       async verifyPin(
 *           context: PinVerificationContext,
 *           handler: PinVerificationHandler
 *       ): Promise<void> {
 *           await handler.verifyPin(pin).catch(console.error);
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
 *   async authenticateWithOutOfBand(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *        await client.operations.outOfBandOperation
 *            .payload(payload)
 *            .onRegistration((registration) => {
 *               // handle registration
 *            })
 *            .onAuthentication((authentication) => {
 *                authentication
 *                    .accountSelector(new AccountSelectorImpl())
 *                    .authenticatorSelector(new AuthenticatorSelectorImpl())
 *                    .pinUserVerifier(new PinUserVerifierImpl())
 *                    .biometricUserVerifier(new BiometricUserVerifierImpl())
 *                    .onSuccess((authorizationProvider) => {
 *                        // handle success
 *                    })
 *                    .onError((error) => {
 *                        // handle error
 *                    })
 *                    .execute();
 *            })
 *            .onError((_error) => {
 *                // handle out-of-band error
 *            })
 *            .execute();
 *   }
 * ```
 *
 * @see {@link OutOfBandOperation.onAuthentication}
 */
class OutOfBandAuthentication extends _HttpOperation.HttpOperation {}
exports.OutOfBandAuthentication = OutOfBandAuthentication;
class OutOfBandAuthenticationImpl extends _HttpOperation.HttpOperationImpl {
  constructor(operationId) {
    super();
    this.operationId = operationId;
  }
  accountSelector(accountSelector) {
    this._accountSelector = accountSelector;
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
    const operation = new _UserInteractionPlatformOperation.UserInteractionPlatformOperationImpl(this.operationId, this._authenticatorSelector, this._accountSelector, this._biometricUserVerifier, this._devicePasscodeUserVerifier, this._fingerprintUserVerifier, this._pinUserVerifier);

    /// IMPORTANT: no need to start event listening
    /// since it is started by OutOfBandOperation already
    _PlatformOperationCache.PlatformOperationCache.getInstance().put(operation);
    const message = new _OutOfBandAuthenticationMessage.OutOfBandAuthenticationMessage(this.operationId, this._accountSelector !== undefined, this._authenticatorSelector !== undefined, false, this._pinUserVerifier !== undefined, this._biometricUserVerifier !== undefined, this._devicePasscodeUserVerifier !== undefined, this._fingerprintUserVerifier !== undefined, this._onSuccess !== undefined, this._onError !== undefined, this.httpRequestHeaders);
    const finish = () => {
      _NativeEventListener.NativeEventListener.getInstance().stop();
      _PlatformOperationCache.PlatformOperationCache.getInstance().delete(this.operationId);
    };
    return _MobileAuthenticationSdk.default.oobAuthenticate(message).then(data => {
      var _this$_onSuccess;
      finish();
      const successMessage = _OnSuccessMessage.OnSuccessMessage.fromJson(data);
      (_this$_onSuccess = this._onSuccess) === null || _this$_onSuccess === void 0 || _this$_onSuccess.call(this, successMessage.authorizationProvider);
    }).catch(error => {
      var _this$_onError;
      finish();
      const operationError = new _OperationErrorConverter.OperationErrorConverter(error).convert();
      (_this$_onError = this._onError) === null || _this$_onError === void 0 || _this$_onError.call(this, operationError);
    });
  }
}
exports.OutOfBandAuthenticationImpl = OutOfBandAuthenticationImpl;
//# sourceMappingURL=OutOfBandAuthentication.js.map