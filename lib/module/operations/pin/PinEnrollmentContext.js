/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinEnrollmentErrorConverter } from '../../error/pin/enrollment/PinEnrollmentErrorConverter';

/**
 * The object providing some contextual information during PIN enrollment.
 *
 * @see {@link PinEnroller.enrollPin}
 */
export class PinEnrollmentContext {
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
class PinEnrollmentContextImpl extends PinEnrollmentContext {
  constructor(username, lastRecoverableError) {
    super();
    this.username = username;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const username = json.username;
    const lastRecoverableError = json.lastRecoverableError && new PinEnrollmentErrorConverter(json.lastRecoverableError).convert();
    return new PinEnrollmentContextImpl(username, lastRecoverableError);
  }
}
//# sourceMappingURL=PinEnrollmentContext.js.map