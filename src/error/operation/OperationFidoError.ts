/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationError } from './OperationError';
import { FidoErrorCode } from '../FidoErrorCode';

/**
 * An error that indicates that a FIDO UAF error occurred during an operation.
 */
export class OperationFidoError extends OperationError {
	/**
	 * The FIDO UAF error that occurred.
	 */
	errorCode: FidoErrorCode;

	/**
	 * Provides details about the error that occurred.
	 */
	description: string;

	/**
	 * The exception (if any) that caused this error.
	 */
	cause?: string;

	/**
	 * The default constructor.
	 *
	 * @param errorCode the FIDO UAF error that occurred.
	 * @param description provides details about the error that occurred.
	 * @param cause the exception (if any) that caused this error.
	 */
	constructor(errorCode: FidoErrorCode, description: string, cause?: string) {
		super();
		this.errorCode = errorCode;
		this.description = description;
		this.cause = cause;
	}
}
