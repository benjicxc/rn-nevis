"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authenticator = void 0;
var _RegistrationInfo = require("./RegistrationInfo");
var _UserEnrollment = require("./UserEnrollment");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An object describing an authenticator.
 */
class Authenticator {
  /**
   * The "Authenticator Attestation ID" (AAID), which identifies the type and batch of the
   * authenticator.
   */

  /**
   * The object containing the registration information of this `Authenticator`.
   */

  /**
   * The user enrollment information.
   *
   * If this is an OS based authenticator (such as the fingerprint authenticator) the user
   * is enrolled when fingerprints are defined at the operating system level.
   *
   * If the authenticator is managed at the SDK level (PIN), the credentials are defined during
   * registration using a {@link PinEnroller}.
   *
   * If the user is not enrolled in a system managed authenticator (fingerprint, biometric), the
   * authenticator cannot be used to do a registration or an authentication.
   *
   * If an authenticator that is not supported is provided through {@link AuthenticatorSelector}
   * for registration or authentication operations, an {@link OperationError} will be returned
   * as a result of the operation.
   */

  /**
   * Returns whether the device has hardware supporting this authenticator or not. For example
   * if this is a fingerprint authenticator and the mobile device where the SDK is running does
   * not have a fingerprint sensor, this method will return `false`.
   *
   * If an authenticator that is not supported is provided through {@link AuthenticatorSelector}
   * for registration or authentication operations, an {@link OperationError} will be returned
   * as a result of the operation.
   */

  /**
   * Alternate constructor that creates an {@link Authenticator} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns an {@link Authenticator} instance.
   */
  static fromJson(json) {
    return AuthenticatorImpl.fromJson(json);
  }
}
exports.Authenticator = Authenticator;
class AuthenticatorImpl extends Authenticator {
  constructor(aaid, registration, userEnrollment, isSupportedByHardware) {
    super();
    this.aaid = aaid;
    this.registration = registration;
    this.userEnrollment = userEnrollment;
    this.isSupportedByHardware = isSupportedByHardware;
  }
  static fromJson(json) {
    const aaid = json.aaid;
    const registration = _RegistrationInfo.RegistrationInfo.fromJson(json.registration);
    const userEnrollment = _UserEnrollment.UserEnrollment.fromJson(json.userEnrollment);
    const isSupportedByHardware = json.isSupportedByHardware;
    return new AuthenticatorImpl(aaid, registration, userEnrollment, isSupportedByHardware);
  }
}
//# sourceMappingURL=Authenticator.js.map