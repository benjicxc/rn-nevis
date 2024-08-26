"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutOfBandPayloadErrorConverter = void 0;
var _OutOfBandPayloadDecryptionError = require("./OutOfBandPayloadDecryptionError");
var _OutOfBandPayloadDeviceProtectionError = require("./OutOfBandPayloadDeviceProtectionError");
var _OutOfBandPayloadMalformedPayload = require("./OutOfBandPayloadMalformedPayload");
var _OutOfBandPayloadNoDeviceLockError = require("./OutOfBandPayloadNoDeviceLockError");
var _OutOfBandPayloadUnknownError = require("./OutOfBandPayloadUnknownError");
var _ErrorConverter = require("../../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var OutOfBandPayloadErrorType = /*#__PURE__*/function (OutOfBandPayloadErrorType) {
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["DecryptionError"] = 0] = "DecryptionError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["DeviceProtectionError"] = 1] = "DeviceProtectionError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["MalformedPayload"] = 2] = "MalformedPayload";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["NoDeviceLockError"] = 3] = "NoDeviceLockError";
  OutOfBandPayloadErrorType[OutOfBandPayloadErrorType["Unknown"] = 4] = "Unknown";
  return OutOfBandPayloadErrorType;
}(OutOfBandPayloadErrorType || {});
class OutOfBandPayloadErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = OutOfBandPayloadErrorType[this.error.type];
    switch (subtype) {
      case OutOfBandPayloadErrorType.DecryptionError:
        return new _OutOfBandPayloadDecryptionError.OutOfBandPayloadDecryptionError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.DeviceProtectionError:
        return new _OutOfBandPayloadDeviceProtectionError.OutOfBandPayloadDeviceProtectionError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.MalformedPayload:
        return new _OutOfBandPayloadMalformedPayload.OutOfBandPayloadMalformedPayload(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.NoDeviceLockError:
        return new _OutOfBandPayloadNoDeviceLockError.OutOfBandPayloadNoDeviceLockError(this.error.description, this.error.cause);
      case OutOfBandPayloadErrorType.Unknown:
        return new _OutOfBandPayloadUnknownError.OutOfBandPayloadUnknownError(this.error.description, this.error.cause);
    }
  }
}
exports.OutOfBandPayloadErrorConverter = OutOfBandPayloadErrorConverter;
//# sourceMappingURL=OutOfBandPayloadErrorConverter.js.map