"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationErrorConverter = void 0;
var _InitializationDeviceProtectionError = require("./InitializationDeviceProtectionError");
var _InitializationHardwareError = require("./InitializationHardwareError");
var _InitializationLockScreenHasChangedError = require("./InitializationLockScreenHasChangedError");
var _InitializationNoDeviceLockError = require("./InitializationNoDeviceLockError");
var _InitializationRootedError = require("./InitializationRootedError");
var _InitializationUnknownError = require("./InitializationUnknownError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var InitializationErrorType = /*#__PURE__*/function (InitializationErrorType) {
  InitializationErrorType[InitializationErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  InitializationErrorType[InitializationErrorType["HardwareError"] = 1] = "HardwareError";
  InitializationErrorType[InitializationErrorType["LockScreenHasChangedError"] = 2] = "LockScreenHasChangedError";
  InitializationErrorType[InitializationErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  InitializationErrorType[InitializationErrorType["RootedError"] = 4] = "RootedError";
  InitializationErrorType[InitializationErrorType["Unknown"] = 5] = "Unknown";
  return InitializationErrorType;
}(InitializationErrorType || {});
class InitializationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = InitializationErrorType[this.error.type];
    switch (subtype) {
      case InitializationErrorType.DeviceProtectionError:
        return new _InitializationDeviceProtectionError.InitializationDeviceProtectionError(this.error.description, this.error.cause);
      case InitializationErrorType.HardwareError:
        return new _InitializationHardwareError.InitializationHardwareError(this.error.description, this.error.cause);
      case InitializationErrorType.LockScreenHasChangedError:
        return new _InitializationLockScreenHasChangedError.InitializationLockScreenHasChangedError(this.error.description, this.error.cause);
      case InitializationErrorType.NoDeviceLockError:
        return new _InitializationNoDeviceLockError.InitializationNoDeviceLockError(this.error.description, this.error.cause);
      case InitializationErrorType.RootedError:
        return new _InitializationRootedError.InitializationRootedError(this.error.description, this.error.cause);
      case InitializationErrorType.Unknown:
        return new _InitializationUnknownError.InitializationUnknownError(this.error.description, this.error.cause);
    }
  }
}
exports.InitializationErrorConverter = InitializationErrorConverter;
//# sourceMappingURL=InitializationErrorConverter.js.map