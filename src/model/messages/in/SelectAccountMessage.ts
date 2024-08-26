/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AccountSelectionContext } from '../../../operations/selection/AccountSelectionContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the select account native event.
 */
export class SelectAccountMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The returned account selection context.
	 */
	context: AccountSelectionContext;

	/**
	 * Default constructor for {@link SelectAccountMessage}.
	 *
	 * @param operationId the identifier of operation.
	 * @param context the returned account selection context.
	 */
	private constructor(operationId: string, context: AccountSelectionContext) {
		super();
		this.operationId = operationId;
		this.context = context;
	}

	/**
	 * Alternate constructor that creates an {@link SelectAccountMessage} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created {@link SelectAccountMessage}
	 */
	static fromJson(json: any): SelectAccountMessage {
		const operationId = json.operationId;
		const context = AccountSelectionContext.fromJson(json.context);
		return new SelectAccountMessage(operationId, context);
	}
}
