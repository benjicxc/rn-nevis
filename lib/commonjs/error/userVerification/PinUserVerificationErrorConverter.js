"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinUserVerificationErrorConverter = void 0;
var _PinUserVerificationInvalidPin = require("./PinUserVerificationInvalidPin");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var PinUserVerificationErrorType = /*#__PURE__*/function (PinUserVerificationErrorType) {
  PinUserVerificationErrorType[PinUserVerificationErrorType["InvalidPin"] = 0] = "InvalidPin";
  return PinUserVerificationErrorType;
}(PinUserVerificationErrorType || {});
class PinUserVerificationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = PinUserVerificationErrorType[this.error.type];
    switch (subtype) {
      case PinUserVerificationErrorType.InvalidPin:
        return new _PinUserVerificationInvalidPin.PinUserVerificationInvalidPin(this.error.description, this.error.cause);
    }
  }
}
exports.PinUserVerificationErrorConverter = PinUserVerificationErrorConverter;
//# sourceMappingURL=PinUserVerificationErrorConverter.js.map