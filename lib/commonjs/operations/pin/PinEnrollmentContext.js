"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnrollmentContext = void 0;
var _PinEnrollmentErrorConverter = require("../../error/pin/enrollment/PinEnrollmentErrorConverter");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object providing some contextual information during PIN enrollment.
 *
 * @see {@link PinEnroller.enrollPin}
 */
class PinEnrollmentContext {
  /**
   * The username whose PIN must be enrolled.
   */

  /**
   * When a recoverable error occurred during the last pin enrollment, this method returns the
   * object describing the last error.
   */

  /**
   * Alternate constructor that creates an instance from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    return PinEnrollmentContextImpl.fromJson(json);
  }
}
exports.PinEnrollmentContext = PinEnrollmentContext;
class PinEnrollmentContextImpl extends PinEnrollmentContext {
  constructor(username, lastRecoverableError) {
    super();
    this.username = username;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const username = json.username;
    const lastRecoverableError = json.lastRecoverableError && new _PinEnrollmentErrorConverter.PinEnrollmentErrorConverter(json.lastRecoverableError).convert();
    return new PinEnrollmentContextImpl(username, lastRecoverableError);
  }
}
//# sourceMappingURL=PinEnrollmentContext.js.map