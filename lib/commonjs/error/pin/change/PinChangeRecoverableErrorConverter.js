"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeRecoverableErrorConverter = void 0;
var _PinChangeRecoverableInvalidPin = require("./PinChangeRecoverableInvalidPin");
var _PinChangeRecoverableInvalidPinFormat = require("./PinChangeRecoverableInvalidPinFormat");
var _PinChangeRecoverableOldPinEqualsNewPin = require("./PinChangeRecoverableOldPinEqualsNewPin");
var _ErrorConverter = require("../../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var PinChangeRecoverableErrorType = /*#__PURE__*/function (PinChangeRecoverableErrorType) {
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["InvalidPin"] = 0] = "InvalidPin";
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["InvalidPinFormat"] = 1] = "InvalidPinFormat";
  PinChangeRecoverableErrorType[PinChangeRecoverableErrorType["OldPinEqualsNewPin"] = 2] = "OldPinEqualsNewPin";
  return PinChangeRecoverableErrorType;
}(PinChangeRecoverableErrorType || {});
class PinChangeRecoverableErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = PinChangeRecoverableErrorType[this.error.type];
    switch (subtype) {
      case PinChangeRecoverableErrorType.InvalidPin:
        return new _PinChangeRecoverableInvalidPin.PinChangeRecoverableInvalidPin(this.error.description, this.error.cause);
      case PinChangeRecoverableErrorType.InvalidPinFormat:
        return new _PinChangeRecoverableInvalidPinFormat.PinChangeRecoverableInvalidPinFormat(this.error.description, this.error.cause);
      case PinChangeRecoverableErrorType.OldPinEqualsNewPin:
        return new _PinChangeRecoverableOldPinEqualsNewPin.PinChangeRecoverableOldPinEqualsNewPin(this.error.description, this.error.cause);
    }
  }
}
exports.PinChangeRecoverableErrorConverter = PinChangeRecoverableErrorConverter;
//# sourceMappingURL=PinChangeRecoverableErrorConverter.js.map