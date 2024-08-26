/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationError } from './OperationError';

/**
 * An error that occurs with username-less out-of-band authentication, if the username of a registered
 * account is provided to the {@link AccountSelectionHandler}, but the user is not defined in the server
 * where the token was redeemed.
 */
export class OperationUserNotRegisteredInServerError extends OperationError {
	/**
	 * Provides details about the error that occurred.
	 */
	description: string;

	/**
	 * The exception (if any) that caused this error.
	 */
	cause?: string;

	/**
	 * The default constructor.
	 *
	 * @param description provides details about the error that occurred.
	 * @param cause the exception (if any) that caused this error.
	 */
	constructor(description: string, cause?: string) {
		super();
		this.description = description;
		this.cause = cause;
	}
}
