"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCloudApiErrorConverter = void 0;
var _AuthCloudApiDecryptionError = require("./AuthCloudApiDecryptionError");
var _AuthCloudApiDeviceProtectionError = require("./AuthCloudApiDeviceProtectionError");
var _AuthCloudApiFidoError = require("./AuthCloudApiFidoError");
var _AuthCloudApiMalformedPayload = require("./AuthCloudApiMalformedPayload");
var _AuthCloudApiNetworkError = require("./AuthCloudApiNetworkError");
var _AuthCloudApiNoDeviceLockError = require("./AuthCloudApiNoDeviceLockError");
var _AuthCloudApiTokenAlreadyRedeemed = require("./AuthCloudApiTokenAlreadyRedeemed");
var _AuthCloudApiTokenExpired = require("./AuthCloudApiTokenExpired");
var _AuthCloudApiUnknownError = require("./AuthCloudApiUnknownError");
var _AuthCloudApiUserAlreadyRegisteredInAnotherServerError = require("./AuthCloudApiUserAlreadyRegisteredInAnotherServerError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var AuthCloudApiErrorType = /*#__PURE__*/function (AuthCloudApiErrorType) {
  AuthCloudApiErrorType[AuthCloudApiErrorType["DecryptionError"] = 0] = "DecryptionError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["DeviceProtectionError"] = 1] = "DeviceProtectionError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["FidoError"] = 2] = "FidoError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["MalformedPayload"] = 3] = "MalformedPayload";
  AuthCloudApiErrorType[AuthCloudApiErrorType["NetworkError"] = 4] = "NetworkError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["NoDeviceLockError"] = 5] = "NoDeviceLockError";
  AuthCloudApiErrorType[AuthCloudApiErrorType["TokenAlreadyRedeemed"] = 6] = "TokenAlreadyRedeemed";
  AuthCloudApiErrorType[AuthCloudApiErrorType["TokenExpired"] = 7] = "TokenExpired";
  AuthCloudApiErrorType[AuthCloudApiErrorType["Unknown"] = 8] = "Unknown";
  AuthCloudApiErrorType[AuthCloudApiErrorType["UserAlreadyRegisteredInAnotherServer"] = 9] = "UserAlreadyRegisteredInAnotherServer";
  return AuthCloudApiErrorType;
}(AuthCloudApiErrorType || {});
class AuthCloudApiErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = AuthCloudApiErrorType[this.error.type];
    switch (subtype) {
      case AuthCloudApiErrorType.DecryptionError:
        return new _AuthCloudApiDecryptionError.AuthCloudApiDecryptionError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.DeviceProtectionError:
        return new _AuthCloudApiDeviceProtectionError.AuthCloudApiDeviceProtectionError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new _AuthCloudApiFidoError.AuthCloudApiFidoError(this.error.errorCode, this.error.description, this.error.cause);
          }
          return new _AuthCloudApiUnknownError.AuthCloudApiUnknownError(this.error.description, this.error.cause);
        }
      case AuthCloudApiErrorType.MalformedPayload:
        return new _AuthCloudApiMalformedPayload.AuthCloudApiMalformedPayload(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.NetworkError:
        return new _AuthCloudApiNetworkError.AuthCloudApiNetworkError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.NoDeviceLockError:
        return new _AuthCloudApiNoDeviceLockError.AuthCloudApiNoDeviceLockError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.TokenAlreadyRedeemed:
        return new _AuthCloudApiTokenAlreadyRedeemed.AuthCloudApiTokenAlreadyRedeemed(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.TokenExpired:
        return new _AuthCloudApiTokenExpired.AuthCloudApiTokenExpired(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.Unknown:
        return new _AuthCloudApiUnknownError.AuthCloudApiUnknownError(this.error.description, this.error.cause);
      case AuthCloudApiErrorType.UserAlreadyRegisteredInAnotherServer:
        return new _AuthCloudApiUserAlreadyRegisteredInAnotherServerError.AuthCloudApiUserAlreadyRegisteredInAnotherServerError(this.error.description, this.error.cause);
    }
  }
}
exports.AuthCloudApiErrorConverter = AuthCloudApiErrorConverter;
//# sourceMappingURL=AuthCloudApiErrorConverter.js.map