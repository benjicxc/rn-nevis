"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceInformationChangeErrorConverter = void 0;
var _DeviceInformationChangeDeviceProtectionError = require("./DeviceInformationChangeDeviceProtectionError");
var _DeviceInformationChangeNameAlreadyExists = require("./DeviceInformationChangeNameAlreadyExists");
var _DeviceInformationChangeNetworkError = require("./DeviceInformationChangeNetworkError");
var _DeviceInformationChangeNoDeviceLockError = require("./DeviceInformationChangeNoDeviceLockError");
var _DeviceInformationChangeNotFound = require("./DeviceInformationChangeNotFound");
var _DeviceInformationChangeSigningError = require("./DeviceInformationChangeSigningError");
var _DeviceInformationChangeUnknownError = require("./DeviceInformationChangeUnknownError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var DeviceInformationChangeErrorType = /*#__PURE__*/function (DeviceInformationChangeErrorType) {
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NameAlreadyExists"] = 1] = "NameAlreadyExists";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NetworkError"] = 2] = "NetworkError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["NotFound"] = 4] = "NotFound";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["SigningError"] = 5] = "SigningError";
  DeviceInformationChangeErrorType[DeviceInformationChangeErrorType["Unknown"] = 6] = "Unknown";
  return DeviceInformationChangeErrorType;
}(DeviceInformationChangeErrorType || {});
class DeviceInformationChangeErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = DeviceInformationChangeErrorType[this.error.type];
    switch (subtype) {
      case DeviceInformationChangeErrorType.DeviceProtectionError:
        return new _DeviceInformationChangeDeviceProtectionError.DeviceInformationChangeDeviceProtectionError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NameAlreadyExists:
        return new _DeviceInformationChangeNameAlreadyExists.DeviceInformationChangeNameAlreadyExists(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NetworkError:
        return new _DeviceInformationChangeNetworkError.DeviceInformationChangeNetworkError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NoDeviceLockError:
        return new _DeviceInformationChangeNoDeviceLockError.DeviceInformationChangeNoDeviceLockError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.NotFound:
        return new _DeviceInformationChangeNotFound.DeviceInformationChangeNotFound(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.SigningError:
        return new _DeviceInformationChangeSigningError.DeviceInformationChangeSigningError(this.error.description, this.error.cause);
      case DeviceInformationChangeErrorType.Unknown:
        return new _DeviceInformationChangeUnknownError.DeviceInformationChangeUnknownError(this.error.description, this.error.cause);
    }
  }
}
exports.DeviceInformationChangeErrorConverter = DeviceInformationChangeErrorConverter;
//# sourceMappingURL=DeviceInformationChangeErrorConverter.js.map