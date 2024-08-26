"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticatorExtension = void 0;
var _Aaid = require("../localData/Aaid");
var _BiometricUserVerificationHandler = require("../operations/userverification/BiometricUserVerificationHandler");
var _DevicePasscodeUserVerificationHandler = require("../operations/userverification/DevicePasscodeUserVerificationHandler");
var _FingerprintUserVerificationHandler = require("../operations/userverification/FingerprintUserVerificationHandler");
var _PinUserVerificationHandler = require("../operations/userverification/PinUserVerificationHandler");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class AuthenticatorExtension {
  static handlerByAuthenticator(aaid, operationId) {
    switch (aaid) {
      case _Aaid.Aaid.PIN.rawValue():
        return new _PinUserVerificationHandler.PinUserVerificationHandlerImpl(operationId);
      case _Aaid.Aaid.BIOMETRIC.rawValue():
        return new _BiometricUserVerificationHandler.BiometricUserVerificationHandlerImpl(operationId);
      case _Aaid.Aaid.DEVICE_PASSCODE.rawValue():
        return new _DevicePasscodeUserVerificationHandler.DevicePasscodeUserVerificationHandlerImpl(operationId);
      case _Aaid.Aaid.FINGERPRINT.rawValue():
        return new _FingerprintUserVerificationHandler.FingerprintUserVerificationHandlerImpl(operationId);
    }
    throw new Error(`No handler for Authenticator aaid ${aaid}.`);
  }
}
exports.AuthenticatorExtension = AuthenticatorExtension;
//# sourceMappingURL=AuthenticatorExtension.js.map