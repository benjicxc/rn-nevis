/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Authenticator } from '../../../localData/Authenticator';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the local authenticators native event.
 */
export class LocalAuthenticatorsMessage extends ChannelMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * The list of the registered authenticators.
	 */
	authenticators: Array<Authenticator>;

	/**
	 * Default constructor for {@link LocalAuthenticatorsMessage}.
	 *
	 * @param operationId the identifier of the operation.
	 * @param authenticators the list of the registered authenticators.
	 */
	private constructor(operationId: string, authenticators: Array<Authenticator>) {
		super();
		this.operationId = operationId;
		this.authenticators = authenticators;
	}

	/**
	 * Alternate constructor that creates a {@link LocalAuthenticatorsMessage} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns the created instance.
	 */
	static fromJson(json: any): LocalAuthenticatorsMessage {
		const operationId = json.operationId;
		const data = json.authenticators;
		const authenticators: Authenticator[] = data.map((authenticator: any) =>
			Authenticator.fromJson(authenticator)
		);

		return new LocalAuthenticatorsMessage(operationId, authenticators);
	}
}
