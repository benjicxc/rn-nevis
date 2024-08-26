/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
var PinAuthenticatorProtectionStatusType = /*#__PURE__*/function (PinAuthenticatorProtectionStatusType) {
  PinAuthenticatorProtectionStatusType[PinAuthenticatorProtectionStatusType["Unlocked"] = 0] = "Unlocked";
  PinAuthenticatorProtectionStatusType[PinAuthenticatorProtectionStatusType["LastAttemptFailed"] = 1] = "LastAttemptFailed";
  PinAuthenticatorProtectionStatusType[PinAuthenticatorProtectionStatusType["LockedOut"] = 2] = "LockedOut";
  return PinAuthenticatorProtectionStatusType;
}(PinAuthenticatorProtectionStatusType || {});
/**
 * The object describing the PIN authenticator protection status.
 *
 * It provides information regarding how many retries are available for the end user before locking
 * the authenticator.
 */
export class PinAuthenticatorProtectionStatus {
  /**
   * Alternate constructor that creates a {@link PinAuthenticatorProtectionStatus} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns a {@link PinAuthenticatorProtectionStatus} instance.
   */
  static fromJson(json) {
    const subtype = PinAuthenticatorProtectionStatusType[json.type];
    switch (subtype) {
      case PinAuthenticatorProtectionStatusType.Unlocked:
        return PinProtectionStatusUnlocked.fromJson();
      case PinAuthenticatorProtectionStatusType.LastAttemptFailed:
        return PinProtectionStatusLastAttemptFailed.fromJson(json.data);
      case PinAuthenticatorProtectionStatusType.LockedOut:
        return PinProtectionStatusLockedOut.fromJson();
      default:
        throw new Error(`Unknown pin authenticator protection status (${json.type}).`);
    }
  }
}

/**
 * The authenticator is unlocked and can be used.
 */
export class PinProtectionStatusUnlocked extends PinAuthenticatorProtectionStatus {
  /**
   * Alternate constructor that creates a {@link PinProtectionStatusUnlocked} from a json.
   *
   * @returns the created {@link PinProtectionStatusUnlocked} instance.
   */
  static fromJson() {
    return PinProtectionStatusUnlockedImpl.fromJson();
  }
}
export class PinProtectionStatusUnlockedImpl extends PinProtectionStatusUnlocked {
  static fromJson() {
    return new PinProtectionStatusUnlockedImpl();
  }
}

/**
 * An invalid PIN was provided previously.
 *
 * This may imply that an attacker is trying to use the PIN authenticator.
 */
export class PinProtectionStatusLastAttemptFailed extends PinAuthenticatorProtectionStatus {
  /**
   * The number of remaining retries available.
   */

  /**
   * The time that must be passed before the user can try to provide credentials again.
   * If the value is 0, it means that no cool-down is required, and that a new PIN can
   * be provided immediately.
   */

  /**
   * Alternate constructor that creates a {@link PinProtectionStatusLastAttemptFailed} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created {@link PinProtectionStatusLastAttemptFailed} instance.
   */
  static fromJson(json) {
    return PinProtectionStatusLastAttemptFailedImpl.fromJson(json);
  }
}
export class PinProtectionStatusLastAttemptFailedImpl extends PinProtectionStatusLastAttemptFailed {
  constructor(remainingRetries, coolDownTimeInSec) {
    super();
    this.remainingRetries = remainingRetries;
    this.coolDownTimeInSec = coolDownTimeInSec;
  }
  static fromJson(json) {
    return new PinProtectionStatusLastAttemptFailedImpl(json.remainingRetries, json.coolDownTimeInSec);
  }
}

/**
 * The authenticator is locked and cannot be used.
 */
export class PinProtectionStatusLockedOut extends PinAuthenticatorProtectionStatus {
  /**
   * Alternate constructor that creates a {@link PinProtectionStatusLockedOut} from a json.
   *
   * @returns the created {@link PinProtectionStatusLockedOut} instance.
   */
  static fromJson() {
    return PinProtectionStatusLockedOutImpl.fromJson();
  }
}
export class PinProtectionStatusLockedOutImpl extends PinProtectionStatusLockedOut {
  static fromJson() {
    return new PinProtectionStatusLockedOutImpl();
  }
}
//# sourceMappingURL=PinAuthenticatorProtectionStatus.js.map