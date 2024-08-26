/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiError } from './AuthCloudApiError';

/**
 * An error that occurs with registration when we try to register a new authenticator in a server for
 * a given username, and there is an authenticator already registered in another server for that username.
 *
 * The SDK does not support having identities with the same username defined in different servers.
 */
export class AuthCloudApiUserAlreadyRegisteredInAnotherServerError extends AuthCloudApiError {
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
