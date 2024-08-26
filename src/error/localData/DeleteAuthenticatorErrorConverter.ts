/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { DeleteAuthenticatorError } from './DeleteAuthenticatorError';
import { DeleteAuthenticatorInvalidAaidError } from './DeleteAuthenticatorInvalidAaidError';
import { DeleteAuthenticatorUnknownError } from './DeleteAuthenticatorUnknownError';
import { ErrorConverter } from '../ErrorConverter';

enum DeleteAuthenticatorErrorType {
	InvalidAaid,
	Unknown,
}

export class DeleteAuthenticatorErrorConverter extends ErrorConverter<DeleteAuthenticatorError> {
	convert(): DeleteAuthenticatorError {
		const subtype =
			DeleteAuthenticatorErrorType[
				this.error.type as keyof typeof DeleteAuthenticatorErrorType
			];
		switch (subtype) {
			case DeleteAuthenticatorErrorType.InvalidAaid:
				return new DeleteAuthenticatorInvalidAaidError(
					this.error.description,
					this.error.cause
				);
			case DeleteAuthenticatorErrorType.Unknown:
				return new DeleteAuthenticatorUnknownError(
					this.error.description,
					this.error.cause
				);
		}
	}
}
