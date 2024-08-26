/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PlatformOperation } from './PlatformOperation';
import { Aaid } from '../../localData/Aaid';
import { PinChangeHandlerImpl } from '../../operations/pin/PinChangeHandler';
import { PinEnrollmentHandlerImpl } from '../../operations/pin/PinEnrollmentHandler';
import { AccountSelectionHandlerImpl } from '../../operations/selection/AccountSelectionHandler';
import { AuthenticatorSelectionHandlerImpl } from '../../operations/selection/AuthenticatorSelectionHandler';
/**
 * Helps in following the states of user interaction operations during method
 * channel calls.
 */
export class UserInteractionPlatformOperation extends PlatformOperation {
  /**
   * The {@link AccountSelector} given when an operation is started.
   *
   * E.g.: During an out-of-band process.
   */

  /**
   * The {@link AuthenticatorSelector} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link PinEnroller} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link PinUserVerifier} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link PinChanger} given when an operation is started.
   */

  /**
   * The {@link BiometricUserVerifier} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link DevicePasscodeUserVerifier} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link FingerprintUserVerifier} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   */

  /**
   * The {@link AccountSelectionHandler} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   * This is generated automatically based on the {@link operationId}.
   */

  /**
   * The {@link AuthenticatorSelectionHandler} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   * This is generated automatically based on the {@link operationId}.
   */

  /**
   * The {@link PinEnrollmentHandler} given when an operation is started.
   *
   * Eg.: During an out-of-band process.
   * This is generated automatically based on the {@link operationId}.
   */

  /**
   * The {@link PinChangeHandler} given when an operation is started.
   *
   * Eg.: During a pin change.
   * This is generated automatically based on the {@link operationId}.
   */

  /**
   * The account selection interaction.
   *
   * The implementing class must ask the user to choose one of the accounts
   * exposed by the {@link AccountSelectionContext} and provide the choice to the
   * {@link AccountSelectionHandler}.
   *
   * @param context the object containing the list of existing accounts and authenticators.
   */
  selectAccount(context) {
    var _this$accountSelector;
    (_this$accountSelector = this.accountSelector) === null || _this$accountSelector === void 0 || _this$accountSelector.selectAccount(context, this.accountSelectionHandler);
  }

  /**
   * The authenticator selection interaction.
   *
   * The implementing class must ask the user to choose one of the authenticators
   * exposed by the {@link AuthenticatorSelectionContext} and provide the choice to the
   * {@link AuthenticatorSelectionHandler}.
   *
   * Note, that in the case of transaction confirmation (which can be considered
   * a special case of authentication) the implementing classes must present
   * the contents of the transaction (if any) to the user for verification
   * @see {@link AuthenticatorSelectionContext.transactionConfirmationData}
   *
   * @param context the object containing the list of existing authenticators.
   */
  selectAuthenticator(context) {
    var _this$authenticatorSe;
    (_this$authenticatorSe = this.authenticatorSelector) === null || _this$authenticatorSe === void 0 || _this$authenticatorSe.selectAuthenticator(context, this.authenticatorSelectionHandler);
  }

  /**
   * The method that will be invoked till either the user provides a PIN that
   * conforms to the format expected by the SDK (i.e. a 6 digit PIN) or till the
   * operation is canceled (through the [PinEnrollmentHandler.cancel].
   *
   * @param context the context.
   */
  enrollPin(context) {
    var _this$pinEnroller;
    (_this$pinEnroller = this.pinEnroller) === null || _this$pinEnroller === void 0 || _this$pinEnroller.enrollPin(context, this.pinEnrollmentHandler);
  }

  /**
   * The user verification interaction.
   *
   * In the case of the registration the user must provide credentials again as
   * required by the FIDO UAF protocol.
   * In the case of the authentication, this is invoked for the user to provide
   * credentials.
   *
   * If the user provided invalid credentials, and it results in a non-recoverable
   * error, then `onSuccess` method will be invoked.
   *
   * @param context the object providing the information required for the verification
   * process.
   * @param handler the object that must be notified with the result of the interaction.
   */
  verifyUser(context, handler) {
    switch (context.authenticator.aaid) {
      case Aaid.PIN.rawValue():
        return this.pinUserVerifier.verifyPin(context, handler);
      case Aaid.BIOMETRIC.rawValue():
        return this.biometricUserVerifier.verifyBiometric(context, handler);
      case Aaid.DEVICE_PASSCODE.rawValue():
        return this.devicePasscodeUserVerifier.verifyDevicePasscode(context, handler);
      case Aaid.FINGERPRINT.rawValue():
        return this.fingerprintUserVerifier.verifyFingerprint(context, handler);
    }
    return Promise.reject(new Error(`No verifier found for Authenticator aaid ${context.authenticator.aaid} when verifying the user.`));
  }

  /**
   * This method is invoked when either valid local system credentials (biometric,
   * fingerprint) or valid PIN credentials were provided and verified locally.
   *
   * This method can be used for instance to display some progress message
   * indicating that the operation is ongoing.
   *
   * Note that invoking this method does not mean that the UAF operation completed
   * successfully (this is notified through `onSuccess` methods once the FIDO UAF
   * server validates the request generated with the credentials).
   *
   * @param authenticator the object describing the authenticator where credentials
   * were validated.
   */
  onValidCredentialsProvided(authenticator) {
    var _this$pinUserVerifier, _this$biometricUserVe, _this$devicePasscodeU, _this$fingerprintUser;
    switch (authenticator.aaid) {
      case Aaid.PIN.rawValue():
        return (_this$pinUserVerifier = this.pinUserVerifier) === null || _this$pinUserVerifier === void 0 ? void 0 : _this$pinUserVerifier.onValidCredentialsProvided();
      case Aaid.BIOMETRIC.rawValue():
        return (_this$biometricUserVe = this.biometricUserVerifier) === null || _this$biometricUserVe === void 0 ? void 0 : _this$biometricUserVe.onValidCredentialsProvided();
      case Aaid.DEVICE_PASSCODE.rawValue():
        return (_this$devicePasscodeU = this.devicePasscodeUserVerifier) === null || _this$devicePasscodeU === void 0 ? void 0 : _this$devicePasscodeU.onValidCredentialsProvided();
      case Aaid.FINGERPRINT.rawValue():
        return (_this$fingerprintUser = this.fingerprintUserVerifier) === null || _this$fingerprintUser === void 0 ? void 0 : _this$fingerprintUser.onValidCredentialsProvided();
    }
    throw new Error(`No verifier found for Authenticator aaid ${authenticator.aaid} when valid credentials provided.`);
  }

  /**
   * The method that will be invoked till either the user provides the old PIN
   * and a new PIN that conforms to the format expected by the SDK (i.e. a 6
   * digit PIN), or till the operation is canceled (through the [PinChangeHandler.cancel]),
   * or till the PIN authenticator is permanently locked because the user provided
   * too many times an invalid PIN.
   *
   * @param context the context.
   */
  changePin(context) {
    var _this$pinChanger;
    (_this$pinChanger = this.pinChanger) === null || _this$pinChanger === void 0 || _this$pinChanger.changePin(context, this.pinChangeHandler);
  }
}
export class UserInteractionPlatformOperationImpl extends UserInteractionPlatformOperation {
  constructor(operationId, authenticatorSelector, accountSelector, biometricUserVerifier, devicePasscodeUserVerifier, fingerprintUserVerifier, pinUserVerifier, pinChanger, pinEnroller) {
    super();
    this.operationId = operationId;
    this.authenticatorSelector = authenticatorSelector;
    this.accountSelector = accountSelector;
    this.biometricUserVerifier = biometricUserVerifier;
    this.devicePasscodeUserVerifier = devicePasscodeUserVerifier;
    this.fingerprintUserVerifier = fingerprintUserVerifier;
    this.pinUserVerifier = pinUserVerifier;
    this.pinChanger = pinChanger;
    this.pinEnroller = pinEnroller;
    this.accountSelectionHandler = new AccountSelectionHandlerImpl(operationId);
    this.authenticatorSelectionHandler = new AuthenticatorSelectionHandlerImpl(operationId);
    this.pinEnrollmentHandler = new PinEnrollmentHandlerImpl(operationId);
    this.pinChangeHandler = new PinChangeHandlerImpl(operationId);
  }
}
//# sourceMappingURL=UserInteractionPlatformOperation.js.map