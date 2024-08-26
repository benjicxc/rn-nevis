"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAuthenticatorErrorConverter = void 0;
var _DeleteAuthenticatorInvalidAaidError = require("./DeleteAuthenticatorInvalidAaidError");
var _DeleteAuthenticatorUnknownError = require("./DeleteAuthenticatorUnknownError");
var _ErrorConverter = require("../ErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var DeleteAuthenticatorErrorType = /*#__PURE__*/function (DeleteAuthenticatorErrorType) {
  DeleteAuthenticatorErrorType[DeleteAuthenticatorErrorType["InvalidAaid"] = 0] = "InvalidAaid";
  DeleteAuthenticatorErrorType[DeleteAuthenticatorErrorType["Unknown"] = 1] = "Unknown";
  return DeleteAuthenticatorErrorType;
}(DeleteAuthenticatorErrorType || {});
class DeleteAuthenticatorErrorConverter extends _ErrorConverter.ErrorConverter {
  convert() {
    const subtype = DeleteAuthenticatorErrorType[this.error.type];
    switch (subtype) {
      case DeleteAuthenticatorErrorType.InvalidAaid:
        return new _DeleteAuthenticatorInvalidAaidError.DeleteAuthenticatorInvalidAaidError(this.error.description, this.error.cause);
      case DeleteAuthenticatorErrorType.Unknown:
        return new _DeleteAuthenticatorUnknownError.DeleteAuthenticatorUnknownError(this.error.description, this.error.cause);
    }
  }
}
exports.DeleteAuthenticatorErrorConverter = DeleteAuthenticatorErrorConverter;
//# sourceMappingURL=DeleteAuthenticatorErrorConverter.js.map