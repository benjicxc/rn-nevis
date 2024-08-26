"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevicePasscodeUserVerificationContextImpl = exports.DevicePasscodeUserVerificationContext = void 0;
var _UserVerificationContext = require("./UserVerificationContext");
var _Authenticator = require("../../localData/Authenticator");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing information about the device passcode user verification (i.e. the user
 * credential validation) operation to be done.
 *
 * @see {@link DevicePasscodeUserVerifier.verifyDevicePasscode}
 */
class DevicePasscodeUserVerificationContext extends _UserVerificationContext.UserVerificationContext {
  /**
   * Alternate constructor that creates a {@link DevicePasscodeUserVerificationContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link DevicePasscodeUserVerificationContext} instance.
   */
  static fromJson(json) {
    return DevicePasscodeUserVerificationContextImpl.fromJson(json);
  }
}
exports.DevicePasscodeUserVerificationContext = DevicePasscodeUserVerificationContext;
class DevicePasscodeUserVerificationContextImpl extends DevicePasscodeUserVerificationContext {
  constructor(authenticator) {
    super();
    this.authenticator = authenticator;
  }
  static fromJson(json) {
    const authenticator = _Authenticator.Authenticator.fromJson(json.authenticator);
    return new DevicePasscodeUserVerificationContextImpl(authenticator);
  }
}
exports.DevicePasscodeUserVerificationContextImpl = DevicePasscodeUserVerificationContextImpl;
//# sourceMappingURL=DevicePasscodeUserVerificationContext.js.map