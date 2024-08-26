/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

enum PinAuthenticatorProtectionStatusType {
	Unlocked,
	LastAttemptFailed,
	LockedOut,
}

/**
 * The object describing the PIN authenticator protection status.
 *
 * It provides information regarding how many retries are available for the end user before locking
 * the authenticator.
 */
export abstract class PinAuthenticatorProtectionStatus {
	/**
	 * Alternate constructor that creates a {@link PinAuthenticatorProtectionStatus} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns a {@link PinAuthenticatorProtectionStatus} instance.
	 */
	static fromJson(json: any): PinAuthenticatorProtectionStatus {
		const subtype =
			PinAuthenticatorProtectionStatusType[
				json.type as keyof typeof PinAuthenticatorProtectionStatusType
			];
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
export abstract class PinProtectionStatusUnlocked extends PinAuthenticatorProtectionStatus {
	/**
	 * Alternate constructor that creates a {@link PinProtectionStatusUnlocked} from a json.
	 *
	 * @returns the created {@link PinProtectionStatusUnlocked} instance.
	 */
	static fromJson(): PinProtectionStatusUnlocked {
		return PinProtectionStatusUnlockedImpl.fromJson();
	}
}

export class PinProtectionStatusUnlockedImpl extends PinProtectionStatusUnlocked {
	static fromJson(): PinProtectionStatusUnlockedImpl {
		return new PinProtectionStatusUnlockedImpl();
	}
}

/**
 * An invalid PIN was provided previously.
 *
 * This may imply that an attacker is trying to use the PIN authenticator.
 */
export abstract class PinProtectionStatusLastAttemptFailed extends PinAuthenticatorProtectionStatus {
	/**
	 * The number of remaining retries available.
	 */
	abstract remainingRetries: number;

	/**
	 * The time that must be passed before the user can try to provide credentials again.
	 * If the value is 0, it means that no cool-down is required, and that a new PIN can
	 * be provided immediately.
	 */
	abstract coolDownTimeInSec: number;

	/**
	 * Alternate constructor that creates a {@link PinProtectionStatusLastAttemptFailed} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link PinProtectionStatusLastAttemptFailed} instance.
	 */
	static fromJson(json: any): PinProtectionStatusLastAttemptFailed {
		return PinProtectionStatusLastAttemptFailedImpl.fromJson(json);
	}
}

export class PinProtectionStatusLastAttemptFailedImpl extends PinProtectionStatusLastAttemptFailed {
	remainingRetries: number;
	coolDownTimeInSec: number;

	constructor(remainingRetries: number, coolDownTimeInSec: number) {
		super();
		this.remainingRetries = remainingRetries;
		this.coolDownTimeInSec = coolDownTimeInSec;
	}

	static fromJson(json: any): PinProtectionStatusLastAttemptFailedImpl {
		return new PinProtectionStatusLastAttemptFailedImpl(
			json.remainingRetries,
			json.coolDownTimeInSec
		);
	}
}

/**
 * The authenticator is locked and cannot be used.
 */
export abstract class PinProtectionStatusLockedOut extends PinAuthenticatorProtectionStatus {
	/**
	 * Alternate constructor that creates a {@link PinProtectionStatusLockedOut} from a json.
	 *
	 * @returns the created {@link PinProtectionStatusLockedOut} instance.
	 */
	static fromJson(): PinProtectionStatusLockedOut {
		return PinProtectionStatusLockedOutImpl.fromJson();
	}
}

export class PinProtectionStatusLockedOutImpl extends PinProtectionStatusLockedOut {
	static fromJson(): PinProtectionStatusLockedOutImpl {
		return new PinProtectionStatusLockedOutImpl();
	}
}
