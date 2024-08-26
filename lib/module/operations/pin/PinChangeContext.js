/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinAuthenticatorProtectionStatus } from './PinAuthenticatorProtectionStatus';
import { PinChangeRecoverableErrorConverter } from '../../error/pin/change/PinChangeRecoverableErrorConverter';

/**
 * The object providing some contextual information during PIN change.
 *
 * @see {@link PinChanger.changePin}
 */
export class PinChangeContext {
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
export class PinChangeContextImpl extends PinChangeContext {
  constructor(username, authenticatorProtectionStatus, lastRecoverableError) {
    super();
    this.username = username;
    this.authenticatorProtectionStatus = authenticatorProtectionStatus;
    this.lastRecoverableError = lastRecoverableError;
  }
  static fromJson(json) {
    const username = json.username;
    const status = PinAuthenticatorProtectionStatus.fromJson(json.authenticatorProtectionStatus);
    const lastRecoverableError = json.lastRecoverableError && new PinChangeRecoverableErrorConverter(json.lastRecoverableError).convert();
    return new PinChangeContextImpl(username, status, lastRecoverableError);
  }
}
//# sourceMappingURL=PinChangeContext.js.map