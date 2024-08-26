"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FingerprintUserVerificationErrorConverter = void 0;
var _FingerprintUserVerificationError = require("./FingerprintUserVerificationError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class FingerprintUserVerificationErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    return new _FingerprintUserVerificationError.FingerprintUserVerificationError(this.error.description, this.error.cause, this.error.message);
  }
}
exports.FingerprintUserVerificationErrorConverter = FingerprintUserVerificationErrorConverter;
//# sourceMappingURL=FingerprintUserVerificationErrorConverter.js.map