"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollmentErrorConverter = void 0;
var _PinEnrollmentInvalidPinFormat = require("./PinEnrollmentInvalidPinFormat");
var _ErrorConverter = require("../../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var PinEnrollmentErrorType = /*#__PURE__*/function (PinEnrollmentErrorType) {
  PinEnrollmentErrorType[PinEnrollmentErrorType["InvalidPinFormat"] = 0] = "InvalidPinFormat";
  return PinEnrollmentErrorType;
}(PinEnrollmentErrorType || {});
class PinEnrollmentErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = PinEnrollmentErrorType[this.error.type];
    switch (subtype) {
      case PinEnrollmentErrorType.InvalidPinFormat:
        return new _PinEnrollmentInvalidPinFormat.PinEnrollmentInvalidPinFormat(this.error.description, this.error.cause);
    }
  }
}
exports.PinEnrollmentErrorConverter = PinEnrollmentErrorConverter;
//# sourceMappingURL=PinEnrollmentErrorConverter.js.map