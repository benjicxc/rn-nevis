/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeContext } from '../../../operations/pin/PinChangeContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the change pin native event.
 */
export class PinChangerMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The returned pin change context.
	 */
	context: PinChangeContext;

	/**
	 * Default constructor for {@link PinChangerMessage}.
	 *
	 * @param operationId the identifier of the operation.
	 * @param context the returned pin change context.
	 * @private
	 */
	private constructor(operationId: string, context: PinChangeContext) {
		super();
		this.operationId = operationId;
		this.context = context;
	}

	/**
	 * Alternate constructor that creates an {@link PinChangerMessage} from a json.
	 *
	 * @param json contains the source for instance creation.
	 */
	static fromJson(json: any): PinChangerMessage {
		const operationId = json.operationId;
		const context = PinChangeContext.fromJson(json.context);

		return new PinChangerMessage(operationId, context);
	}
}
