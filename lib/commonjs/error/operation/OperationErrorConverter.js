"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationErrorConverter = void 0;
var _OperationDeviceProtectionError = require("./OperationDeviceProtectionError");
var _OperationFidoError = require("./OperationFidoError");
var _OperationNetworkError = require("./OperationNetworkError");
var _OperationNoDeviceLockError = require("./OperationNoDeviceLockError");
var _OperationUnknownError = require("./OperationUnknownError");
var _OperationUserAlreadyRegisteredInAnotherServerError = require("./OperationUserAlreadyRegisteredInAnotherServerError");
var _OperationUserNotRegisteredInServerError = require("./OperationUserNotRegisteredInServerError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var OperationErrorType = /*#__PURE__*/function (OperationErrorType) {
  OperationErrorType[OperationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  OperationErrorType[OperationErrorType["FidoError"] = 1] = "FidoError";
  OperationErrorType[OperationErrorType["NetworkError"] = 2] = "NetworkError";
  OperationErrorType[OperationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  OperationErrorType[OperationErrorType["Unknown"] = 4] = "Unknown";
  OperationErrorType[OperationErrorType["UserAlreadyRegisteredInAnotherServer"] = 5] = "UserAlreadyRegisteredInAnotherServer";
  OperationErrorType[OperationErrorType["UserNotRegisteredInServer"] = 6] = "UserNotRegisteredInServer";
  return OperationErrorType;
}(OperationErrorType || {});
class OperationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = OperationErrorType[this.error.type];
    switch (subtype) {
      case OperationErrorType.DeviceProtectionError:
        return new _OperationDeviceProtectionError.OperationDeviceProtectionError(this.error.description, this.error.cause);
      case OperationErrorType.FidoError:
        {
          if (this.error.errorCode) {
            return new _OperationFidoError.OperationFidoError(this.error.errorCode, this.error.description, this.error.cause);
          }
          return new _OperationUnknownError.OperationUnknownError(this.error.description, this.error.cause);
        }
      case OperationErrorType.NetworkError:
        return new _OperationNetworkError.OperationNetworkError(this.error.description, this.error.cause);
      case OperationErrorType.NoDeviceLockError:
        return new _OperationNoDeviceLockError.OperationNoDeviceLockError(this.error.description, this.error.cause);
      case OperationErrorType.Unknown:
        return new _OperationUnknownError.OperationUnknownError(this.error.description, this.error.cause);
      case OperationErrorType.UserAlreadyRegisteredInAnotherServer:
        return new _OperationUserAlreadyRegisteredInAnotherServerError.OperationUserAlreadyRegisteredInAnotherServerError(this.error.description, this.error.cause);
      case OperationErrorType.UserNotRegisteredInServer:
        return new _OperationUserNotRegisteredInServerError.OperationUserNotRegisteredInServerError(this.error.description, this.error.cause);
    }
  }
}
exports.OperationErrorConverter = OperationErrorConverter;
//# sourceMappingURL=OperationErrorConverter.js.map