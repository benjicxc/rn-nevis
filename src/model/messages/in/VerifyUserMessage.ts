/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedUserVerificationContext } from '../../../model/typed/TypedUserVerificationContext';
import { UserVerificationContext } from '../../../operations/userverification/UserVerificationContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the verify user native event.
 */
export class VerifyUserMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The user verification context.
	 */
	context: UserVerificationContext;

	/**
	 * Default constructor for {@link VerifyUserMessage}.
	 *
	 * @param operationId the identifier of operation.
	 * @param context the user verification context.
	 */
	private constructor(operationId: string, context: UserVerificationContext) {
		super();
		this.operationId = operationId;
		this.context = context;
	}

	/**
	 * Alternate constructor that creates a {@link VerifyUserMessage} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created instance.
	 */
	static fromJson(json: any): VerifyUserMessage {
		const operationId = json.operationId;
		const typedContext = TypedUserVerificationContext.fromJson(json.context);

		return new VerifyUserMessage(operationId, typedContext.wrapped);
	}
}
