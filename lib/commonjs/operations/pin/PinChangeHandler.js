"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeHandlerImpl = exports.PinChangeHandler = void 0;
var _MobileAuthenticationSdk = _interopRequireDefault(require("../../MobileAuthenticationSdk"));
var _OperationIdMessage = require("../../model/messages/out/OperationIdMessage");
var _PinsChangeMessage = require("../../model/messages/out/PinsChangeMessage");
var _CancellableHandler = require("../CancellableHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object handling the old and new PIN provided by the end-user.
 *
 * @see {@link PinChanger.changePin}
 */
class PinChangeHandler extends _CancellableHandler.CancellableHandler {}
exports.PinChangeHandler = PinChangeHandler;
class PinChangeHandlerImpl extends PinChangeHandler {
  constructor(operationId) {
    super();
    this._operationId = operationId;
  }
  async pins(oldPin, newPin) {
    const message = new _PinsChangeMessage.PinsChangeMessage(this._operationId, oldPin, newPin);
    return _MobileAuthenticationSdk.default.pinsChange(message);
  }
  cancel() {
    const message = new _OperationIdMessage.OperationIdMessage(this._operationId);
    return _MobileAuthenticationSdk.default.cancel(message);
  }
}
exports.PinChangeHandlerImpl = PinChangeHandlerImpl;
//# sourceMappingURL=PinChangeHandler.js.map