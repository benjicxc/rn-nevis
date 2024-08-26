/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinEnrollmentContext } from '../../../operations/pin/PinEnrollmentContext';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the enroll pin native event.
 */
export class PinEnrollerMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The pin enrollment context.
	 */
	context: PinEnrollmentContext;

	/**
	 * Default constructor for {@link PinEnrollerMessage}.
	 *
	 * @param operationId the identifier of the operation.
	 * @param context the pin enrollment context.
	 */
	private constructor(operationId: string, context: PinEnrollmentContext) {
		super();
		this.operationId = operationId;
		this.context = context;
	}

	/**
	 * Alternate constructor that creates an {@link PinEnrollerMessage} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created instance.
	 */
	static fromJson(json: any): PinEnrollerMessage {
		const operationId = json.operationId;
		const context = PinEnrollmentContext.fromJson(json.context);

		return new PinEnrollerMessage(operationId, context);
	}
}
