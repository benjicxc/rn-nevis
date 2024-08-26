/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { BiometricUserVerificationContext } from '../../operations/userverification/BiometricUserVerificationContext';
import { DevicePasscodeUserVerificationContext } from '../../operations/userverification/DevicePasscodeUserVerificationContext';
import { FingerprintUserVerificationContext } from '../../operations/userverification/FingerprintUserVerificationContext';
import { PinUserVerificationContext } from '../../operations/userverification/PinUserVerificationContext';
var UserVerificationContextType = /*#__PURE__*/function (UserVerificationContextType) {
  UserVerificationContextType[UserVerificationContextType["PinUserVerificationContext"] = 0] = "PinUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["BiometricUserVerificationContext"] = 1] = "BiometricUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["DevicePasscodeUserVerificationContext"] = 2] = "DevicePasscodeUserVerificationContext";
  UserVerificationContextType[UserVerificationContextType["FingerprintUserVerificationContext"] = 3] = "FingerprintUserVerificationContext";
  return UserVerificationContextType;
}(UserVerificationContextType || {});
export class TypedUserVerificationContext {
  constructor(userVerificationContext) {
    this.wrapped = userVerificationContext;
  }
  static fromJson(json) {
    const subtype = UserVerificationContextType[json.type];
    switch (subtype) {
      case UserVerificationContextType.PinUserVerificationContext:
        return new TypedUserVerificationContext(PinUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.BiometricUserVerificationContext:
        return new TypedUserVerificationContext(BiometricUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.DevicePasscodeUserVerificationContext:
        return new TypedUserVerificationContext(DevicePasscodeUserVerificationContext.fromJson(json.data));
      case UserVerificationContextType.FingerprintUserVerificationContext:
        return new TypedUserVerificationContext(FingerprintUserVerificationContext.fromJson(json.data));
      default:
        throw new Error(`Unknown user verification context (${json.type}).`);
    }
  }
}
//# sourceMappingURL=TypedUserVerificationContext.js.map