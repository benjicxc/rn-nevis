"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollmentHandlerImpl = exports.PinEnrollmentHandler = void 0;
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _PinEnrollMessage = require("../../model/messages/out/PinEnrollMessage");
var _CancellableHandler = require("../CancellableHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object handling the PIN to be enrolled.
 *
 * @see {@link PinEnroller.enrollPin}
 */
class PinEnrollmentHandler extends _CancellableHandler.CancellableHandler {}
exports.PinEnrollmentHandler = PinEnrollmentHandler;
class PinEnrollmentHandlerImpl extends PinEnrollmentHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async pin(pin) {
    const message = new _PinEnrollMessage.PinEnrollMessage(this._operationId, pin);
    return _MobileAuthenticationSdk.default.pinEnroll(message);
  }
  async cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.PinEnrollmentHandlerImpl = PinEnrollmentHandlerImpl;
//# sourceMappingURL=PinEnrollmentHandler.js.map