/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { RecoverableError } from '../RecoverableError';

/**
 * The recoverable error that can occur when verifying the user with fingerprint. This occurs when
 * the user provides bad fingerprints.
 *
 * When this error occurs, the {@link FingerprintUserVerifier.verifyFingerprint} method will be invoked
 * again. This error will be returned by the {@link FingerprintUserVerificationContext.lastRecoverableError}.
 */
export class FingerprintUserVerificationError extends RecoverableError {
	/**
	 * Provides details about the error that occurred.
	 */
	description: string;

	/**
	 * The exception (if any) that caused this error.
	 */
	cause?: string;

	/**
	 * If available, this returns a localized message describing the error that can be presented
	 * to the end-user. This message is provided by the operating system.
	 */
	message?: string;

	/**
	 * The default constructor.
	 *
	 * @param description provides details about the error that occurred.
	 * @param cause the exception (if any) that caused this error.
	 * @param message a localized message describing the error that can be presented to the end-user.
	 */
	constructor(description: string, cause?: string, message?: string) {
		super();
		this.description = description;
		this.cause = cause;
		this.message = message;
	}
}
