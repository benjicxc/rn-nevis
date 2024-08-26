/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { HttpOperationMessage } from './HttpOperationMessage';
import type { OperationMessage } from './OperationMessage';
import type { OutOfBandPayload } from '../../../operations/outOfBand/OutOfBandPayload';
import { RequestHeaders } from '../../../operations/RequestHeaders';

/**
 * Holds the parameters of the out-of-band operation call.
 */
export class OutOfBandOperationMessage implements OperationMessage, HttpOperationMessage {
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * Flag that tells whether the success callback is provided.
	 */
	onSuccessProvided: boolean;

	/**
	 * Flag that tells whether the error callback is provided.
	 */
	onErrorProvided: boolean;

	/**
	 * Specifies the additional request headers that must be included in the HTTP requests sent by
	 * the operation.
	 */
	requestHeaders?: RequestHeaders;

	/**
	 * The identifier of the underlying out-of-band operation.
	 */
	subOperationId: string;

	/**
	 * The out-of-band payload to be handled.
	 */
	payload?: OutOfBandPayload;

	/**
	 * Flag that tells whether the registration callback is provided.
	 */
	onRegistrationProvided?: boolean;

	/**
	 * Flag that tells whether the authentication callback is provided.
	 */
	onAuthenticationProvided?: boolean;

	/**
	 * Creates a new instance.
	 *
	 * @param operationId the identifier of the operation.
	 * @param subOperationId the identifier of the underlying out-of-band operation.
	 * @param onSuccessProvided flag that tells whether the success callback is provided.
	 * @param onErrorProvided flag that tells whether the error callback is provided.
	 * @param requestHeaders specifies the additional request headers that must be included in the
	 * HTTP requests sent by the operation.
	 * @param payload the out-of-band payload to be handled.
	 * @param onRegistrationProvided flag that tells whether the registration callback is provided.
	 * @param onAuthenticationProvided flag that tells whether the authentication callback is provided.
	 */
	constructor(
		operationId: string,
		subOperationId: string,
		onSuccessProvided: boolean,
		onErrorProvided: boolean,
		requestHeaders?: RequestHeaders,
		payload?: OutOfBandPayload,
		onRegistrationProvided?: boolean,
		onAuthenticationProvided?: boolean
	) {
		this.operationId = operationId;
		this.onSuccessProvided = onSuccessProvided;
		this.onErrorProvided = onErrorProvided;
		this.requestHeaders = requestHeaders;
		this.subOperationId = subOperationId;
		this.payload = payload;
		this.onRegistrationProvided = onRegistrationProvided;
		this.onAuthenticationProvided = onAuthenticationProvided;
	}
}
