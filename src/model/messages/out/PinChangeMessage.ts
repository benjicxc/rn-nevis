/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationMessage } from './OperationMessage';
import { PinPolicy } from '../../../operations/pin/PinPolicy';

/**
 * Holds the parameters of the PIN change operation call.
 */
export class PinChangeMessage extends OperationMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * Flag that tells whether the PIN changer is provided.
	 */
	pinChangerProvided: boolean;

	/**
	 * The username.
	 */
	username?: string;

	/**
	 * Specifies the PIN policy to be used.
	 */
	pinPolicy?: PinPolicy;

	/**
	 * Flag that tells whether the success callback is provided.
	 */
	onSuccessProvided: boolean;

	/**
	 * Flag that tells whether the error callback is provided.
	 */
	onErrorProvided: boolean;

	constructor(
		operationId: string,
		pinChangerProvided: boolean,
		onSuccessProvided: boolean,
		onErrorProvided: boolean,
		username?: string,
		pinPolicy?: PinPolicy
	) {
		super();
		this.operationId = operationId;
		this.username = username;
		this.pinPolicy = pinPolicy;
		this.pinChangerProvided = pinChangerProvided;
		this.onSuccessProvided = onSuccessProvided;
		this.onErrorProvided = onErrorProvided;
	}
}
