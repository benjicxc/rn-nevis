"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChangeContextImpl = exports.PinChangeContext = void 0;
var _PinAuthenticatorProtectionStatus = require("./PinAuthenticatorProtectionStatus");
var _PinChangeRecoverableErrorConverter = require("../../error/pin/change/PinChangeRecoverableErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing some contextual information during PIN change.
 *
 * @see {@link PinChanger.changePin}
 */
class PinChangeContext {
  /**
   * The username whose PIN must be changed.
   */

  /**
   * The object describing the PIN protection status (whether is locked, in
   * cool-down mode, etc.).
   */

  /**
   * The object describing the latest recoverable error (if any).
   */

  /**
   * Alternate constructor that creates a {@link PinChangeContext} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link PinChangeContext} instance.
   */
  static fromJson(json) {
    return PinChangeContextImpl.fromJson(json);
  }
}
exports.PinChangeContext = PinChangeContext;
class PinChangeContextImpl extends PinChangeContext {
  constructor(username, authenticatorProtectionStatus, lastRecoverableError) {
    super();
    this.username = username;
    this.authenticatorProtectionStatus = authenticatorProtectionStatus;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const username = json.username;
    const status = _PinAuthenticatorProtectionStatus.PinAuthenticatorProtectionStatus.fromJson(json.authenticatorProtectionStatus);
    const lastRecoverableError = json.lastRecoverableError && new _PinChangeRecoverableErrorConverter.PinChangeRecoverableErrorConverter(json.lastRecoverableError).convert();
    return new PinChangeContextImpl(username, status, lastRecoverableError);
  }
}
exports.PinChangeContextImpl = PinChangeContextImpl;
//# sourceMappingURL=PinChangeContext.js.map