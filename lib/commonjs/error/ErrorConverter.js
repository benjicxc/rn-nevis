"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorConverter = void 0;
var _ChannelError = require("./ChannelError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class ErrorConverter {
  constructor(input) {
    // The first condition is for RecoverableErrors
    // The second is for error thrown by the native plugins
    if (!(input instanceof Error) || 'userInfo' in input) {
      this.error = _ChannelError.ChannelError.fromJson(input);
      return;
    }

    // Error thrown by the RN plugin, convert it to an Unknown error
    this.error = new _ChannelError.ChannelError('Unknown', input.message);
  }
  convert() {
    throw new Error('Must override.');
  }
}
exports.ErrorConverter = ErrorConverter;
//# sourceMappingURL=ErrorConverter.js.map