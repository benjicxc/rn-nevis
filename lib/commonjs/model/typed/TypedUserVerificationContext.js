"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedUserVerificationContext = void 0;
var _BiometricUserVerificationContext = require("../../operations/userverification/BiometricUserVerificationContext");
var _DevicePasscodeUserVerificationContext = require("../../operations/userverification/DevicePasscodeUserVerificationContext");
var _FingerprintUserVerificationContext = require("../../operations/userverification/FingerprintUserVerificationContext");
var _PinUserVerificationContext = require("../../operations/userverification/PinUserVerificationContext");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var UserVerificationContextType = /*#__PURE__*/function (UserVerificationContextType) {
  UserVerificationContextType[UserVerificationContextType["PinUserVerificationContext"] = 0] = "PinUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["BiometricUserVerificationContext"] = 1] = "BiometricUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["DevicePasscodeUserVerificationContext"] = 2] = "DevicePasscodeUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["FingerprintUserVerificationContext"] = 3] = "FingerprintUserVerificationContext";
  return UserVerificationContextType;
}(UserVerificationContextType || {});
class TypedUserVerificationContext {
  constructor(userVerificationContext) {
    this.wrapped = userVerificationContext;
  }
  static fromJson(json) {
    const subtype = UserVerificationContextType[json.type];
    switch (subtype) {
      case UserVerificationContextType.PinUserVerificationContext:
        return new TypedUserVerificationContext(_PinUserVerificationContext.PinUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.BiometricUserVerificationContext:
        return new TypedUserVerificationContext(_BiometricUserVerificationContext.BiometricUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.DevicePasscodeUserVerificationContext:
        return new TypedUserVerificationContext(_DevicePasscodeUserVerificationContext.DevicePasscodeUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.FingerprintUserVerificationContext:
        return new TypedUserVerificationContext(_FingerprintUserVerificationContext.FingerprintUserVerificationContext.fromJson(json.data));
      default:
        throw new Error(`Unknown user verification context (${json.type}).`);
    }
  }
}
exports.TypedUserVerificationContext = TypedUserVerificationContext;
//# sourceMappingURL=TypedUserVerificationContext.js.map