"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FidoErrorCodeConverter = void 0;
var _FidoErrorCode = require("./FidoErrorCode");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class FidoErrorCodeConverter {
  static fromJson(json) {
    return new _FidoErrorCode.FidoErrorCode(json.type, json.description);
  }
}
exports.FidoErrorCodeConverter = FidoErrorCodeConverter;
//# sourceMappingURL=FidoErrorCodeConverter.js.map