/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { PinEnrollmentError } from '../../error/pin/enrollment/PinEnrollmentError';
import { PinEnrollmentErrorConverter } from '../../error/pin/enrollment/PinEnrollmentErrorConverter';

/**
 * The object providing some contextual information during PIN enrollment.
 *
 * @see {@link PinEnroller.enrollPin}
 */
export abstract class PinEnrollmentContext {
	/**
	 * The username whose PIN must be enrolled.
	 */
	abstract username: string;

	/**
	 * When a recoverable error occurred during the last pin enrollment, this method returns the
	 * object describing the last error.
	 */
	abstract lastRecoverableError?: PinEnrollmentError;

	/**
	 * Alternate constructor that creates an instance from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created instance.
	 */
	static fromJson(json: any): PinEnrollmentContext {
		return PinEnrollmentContextImpl.fromJson(json);
	}
}

class PinEnrollmentContextImpl extends PinEnrollmentContext {
	username: string;
	lastRecoverableError?: PinEnrollmentError;

	private constructor(username: string, lastRecoverableError?: PinEnrollmentError) {
		super();
		this.username = username;
		this.lastRecoverableError = lastRecoverableError;
	}

	static fromJson(json: any) {
		const username = json.username;
		const lastRecoverableError =
			json.lastRecoverableError &&
			new PinEnrollmentErrorConverter(json.lastRecoverableError).convert();
		return new PinEnrollmentContextImpl(username, lastRecoverableError);
	}
}
