"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpOperationImpl = exports.HttpOperation = void 0;
var _Operation = require("./Operation");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An operation that requires sending HTTP requests to the backend.
 */
class HttpOperation extends _Operation.Operation {}
exports.HttpOperation = HttpOperation;
class HttpOperationImpl {
  requestHeaders(requestHeaders) {
    this.httpRequestHeaders = requestHeaders;
    return this;
  }
  execute() {
    return Promise.reject(new Error('Method not implemented.'));
  }
}
exports.HttpOperationImpl = HttpOperationImpl;
//# sourceMappingURL=HttpOperation.js.map