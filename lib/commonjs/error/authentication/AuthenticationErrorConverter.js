"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationErrorConverter = void 0;
var _AuthenticationDeviceProtectionError = require("./AuthenticationDeviceProtectionError");
var _AuthenticationFidoError = require("./AuthenticationFidoError");
var _AuthenticationNetworkError = require("./AuthenticationNetworkError");
var _AuthenticationNoDeviceLockError = require("./AuthenticationNoDeviceLockError");
var _AuthenticationUnknownError = require("./AuthenticationUnknownError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var AuthenticationErrorType = /*#__PURE__*/function (AuthenticationErrorType) {
  AuthenticationErrorType[AuthenticationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  AuthenticationErrorType[AuthenticationErrorType["FidoError"] = 1] = "FidoError";
  AuthenticationErrorType[AuthenticationErrorType["NetworkError"] = 2] = "NetworkError";
  AuthenticationErrorType[AuthenticationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  AuthenticationErrorType[AuthenticationErrorType["Unknown"] = 4] = "Unknown";
  return AuthenticationErrorType;
}(AuthenticationErrorType || {});
class AuthenticationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = AuthenticationErrorType[this.error.type];
    switch (subtype) {
      case AuthenticationErrorType.DeviceProtectionError:
        return new _AuthenticationDeviceProtectionError.AuthenticationDeviceProtectionError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new _AuthenticationFidoError.AuthenticationFidoError(this.error.errorCode, this.error.description, this.error.cause, this.error.sessionProvider);
          }
          return new _AuthenticationUnknownError.AuthenticationUnknownError(this.error.description, this.error.cause, this.error.sessionProvider);
        }
      case AuthenticationErrorType.NetworkError:
        return new _AuthenticationNetworkError.AuthenticationNetworkError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.NoDeviceLockError:
        return new _AuthenticationNoDeviceLockError.AuthenticationNoDeviceLockError(this.error.description, this.error.cause, this.error.sessionProvider);
      case AuthenticationErrorType.Unknown:
        return new _AuthenticationUnknownError.AuthenticationUnknownError(this.error.description, this.error.cause, this.error.sessionProvider);
    }
  }
}
exports.AuthenticationErrorConverter = AuthenticationErrorConverter;
//# sourceMappingURL=AuthenticationErrorConverter.js.map