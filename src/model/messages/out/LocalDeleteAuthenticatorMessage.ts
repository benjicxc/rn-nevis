/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationIdMessage } from './OperationIdMessage';

/**
 * Holds the parameters of the local delete authenticator operation call.
 */
export class LocalDeleteAuthenticatorMessage implements OperationIdMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The username whose {@link Authenticator} needs to be deleted.
	 * If no AAID is provided then all authenticators will be deleted.
	 */
	username: string;

	/**
	 * The aaid of the {@link Authenticator} needs to be deleted.
	 */
	aaid?: string;

	constructor(operationId: string, username: string, aaid?: string) {
		this.operationId = operationId;
		this.username = username;
		this.aaid = aaid;
	}
}
