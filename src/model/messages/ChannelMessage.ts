/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Common ancestor for incoming and outgoing call parameters (messages).
 */
export abstract class ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	abstract operationId: string;
}
