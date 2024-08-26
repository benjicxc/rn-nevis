"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandOperationErrorConverter = void 0;
var _OutOfBandOperationDeviceProtectionError = require("./OutOfBandOperationDeviceProtectionError");
var _OutOfBandOperationNetworkError = require("./OutOfBandOperationNetworkError");
var _OutOfBandOperationNoDeviceLockError = require("./OutOfBandOperationNoDeviceLockError");
var _OutOfBandOperationTokenAlreadyRedeemed = require("./OutOfBandOperationTokenAlreadyRedeemed");
var _OutOfBandOperationTokenExpired = require("./OutOfBandOperationTokenExpired");
var _OutOfBandOperationUnknownError = require("./OutOfBandOperationUnknownError");
var _ErrorConverter = require("../../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var OutOfBandOperationErrorType = /*#__PURE__*/function (OutOfBandOperationErrorType) {
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["NetworkError"] = 1] = "NetworkError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["NoDeviceLockError"] = 2] = "NoDeviceLockError";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["TokenAlreadyRedeemed"] = 3] = "TokenAlreadyRedeemed";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["TokenExpired"] = 4] = "TokenExpired";
  OutOfBandOperationErrorType[OutOfBandOperationErrorType["Unknown"] = 5] = "Unknown";
  return OutOfBandOperationErrorType;
}(OutOfBandOperationErrorType || {});
class OutOfBandOperationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = OutOfBandOperationErrorType[this.error.type];
    switch (subtype) {
      case OutOfBandOperationErrorType.DeviceProtectionError:
        return new _OutOfBandOperationDeviceProtectionError.OutOfBandOperationDeviceProtectionError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.NetworkError:
        return new _OutOfBandOperationNetworkError.OutOfBandOperationNetworkError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.NoDeviceLockError:
        return new _OutOfBandOperationNoDeviceLockError.OutOfBandOperationNoDeviceLockError(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.TokenAlreadyRedeemed:
        return new _OutOfBandOperationTokenAlreadyRedeemed.OutOfBandOperationTokenAlreadyRedeemed(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.TokenExpired:
        return new _OutOfBandOperationTokenExpired.OutOfBandOperationTokenExpired(this.error.description, this.error.cause);
      case OutOfBandOperationErrorType.Unknown:
        return new _OutOfBandOperationUnknownError.OutOfBandOperationUnknownError(this.error.description, this.error.cause);
    }
  }
}
exports.OutOfBandOperationErrorConverter = OutOfBandOperationErrorConverter;
//# sourceMappingURL=OutOfBandOperationErrorConverter.js.map