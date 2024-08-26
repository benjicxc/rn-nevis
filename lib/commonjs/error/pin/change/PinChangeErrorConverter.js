"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeErrorConverter = void 0;
var _PinChangeDeviceProtectionError = require("./PinChangeDeviceProtectionError");
var _PinChangeNoDeviceLockError = require("./PinChangeNoDeviceLockError");
var _PinChangePinLocked = require("./PinChangePinLocked");
var _PinChangePinNotEnrolled = require("./PinChangePinNotEnrolled");
var _PinChangeUnknownError = require("./PinChangeUnknownError");
var _PinChangeUserCanceled = require("./PinChangeUserCanceled");
var _ErrorConverter = require("../../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var PinChangeErrorType = /*#__PURE__*/function (PinChangeErrorType) {
  PinChangeErrorType[PinChangeErrorType["DeviceProtectionError"] = 0] = "DeviceProtectionError";
  PinChangeErrorType[PinChangeErrorType["NoDeviceLockError"] = 1] = "NoDeviceLockError";
  PinChangeErrorType[PinChangeErrorType["PinLocked"] = 2] = "PinLocked";
  PinChangeErrorType[PinChangeErrorType["PinNotEnrolled"] = 3] = "PinNotEnrolled";
  PinChangeErrorType[PinChangeErrorType["Unknown"] = 4] = "Unknown";
  PinChangeErrorType[PinChangeErrorType["UserCanceled"] = 5] = "UserCanceled";
  return PinChangeErrorType;
}(PinChangeErrorType || {});
class PinChangeErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = PinChangeErrorType[this.error.type];
    switch (subtype) {
      case PinChangeErrorType.DeviceProtectionError:
        return new _PinChangeDeviceProtectionError.PinChangeDeviceProtectionError(this.error.description, this.error.cause);
      case PinChangeErrorType.NoDeviceLockError:
        return new _PinChangeNoDeviceLockError.PinChangeNoDeviceLockError(this.error.description, this.error.cause);
      case PinChangeErrorType.PinLocked:
        return new _PinChangePinLocked.PinChangePinLocked(this.error.description, this.error.cause);
      case PinChangeErrorType.PinNotEnrolled:
        return new _PinChangePinNotEnrolled.PinChangePinNotEnrolled(this.error.description, this.error.cause);
      case PinChangeErrorType.Unknown:
        return new _PinChangeUnknownError.PinChangeUnknownError(this.error.description, this.error.cause);
      case PinChangeErrorType.UserCanceled:
        return new _PinChangeUserCanceled.PinChangeUserCanceled(this.error.description, this.error.cause);
    }
  }
}
exports.PinChangeErrorConverter = PinChangeErrorConverter;
//# sourceMappingURL=PinChangeErrorConverter.js.map