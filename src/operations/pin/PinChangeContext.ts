/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinAuthenticatorProtectionStatus } from './PinAuthenticatorProtectionStatus';
import type { PinChangeRecoverableError } from '../../error/pin/change/PinChangeRecoverableError';
import { PinChangeRecoverableErrorConverter } from '../../error/pin/change/PinChangeRecoverableErrorConverter';

/**
 * The object providing some contextual information during PIN change.
 *
 * @see {@link PinChanger.changePin}
 */
export abstract class PinChangeContext {
	/**
	 * The username whose PIN must be changed.
	 */
	abstract username: string;

	/**
	 * The object describing the PIN protection status (whether is locked, in
	 * cool-down mode, etc.).
	 */
	abstract authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;

	/**
	 * The object describing the latest recoverable error (if any).
	 */
	abstract lastRecoverableError?: PinChangeRecoverableError;

	/**
	 * Alternate constructor that creates a {@link PinChangeContext} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link PinChangeContext} instance.
	 */
	static fromJson(json: any): PinChangeContext {
		return PinChangeContextImpl.fromJson(json);
	}
}

export class PinChangeContextImpl extends PinChangeContext {
	authenticatorProtectionStatus: PinAuthenticatorProtectionStatus;
	lastRecoverableError?: PinChangeRecoverableError;
	username: string;

	private constructor(
		username: string,
		authenticatorProtectionStatus: PinAuthenticatorProtectionStatus,
		lastRecoverableError?: PinChangeRecoverableError
	) {
		super();
		this.username = username;
		this.authenticatorProtectionStatus = authenticatorProtectionStatus;
		this.lastRecoverableError = lastRecoverableError;
	}

	static fromJson(json: any): PinChangeContextImpl {
		const username = json.username;
		const status = PinAuthenticatorProtectionStatus.fromJson(
			json.authenticatorProtectionStatus
		);
		const lastRecoverableError =
			json.lastRecoverableError &&
			new PinChangeRecoverableErrorConverter(json.lastRecoverableError).convert();
		return new PinChangeContextImpl(username, status, lastRecoverableError);
	}
}
