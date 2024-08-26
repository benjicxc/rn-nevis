/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of an operation identifier based call.
 */
export class OperationIdMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * Creates a new instance.
	 *
	 * @param operationId the identifier of the operation.
	 */
	constructor(operationId: string) {
		super();
		this.operationId = operationId;
	}
}
