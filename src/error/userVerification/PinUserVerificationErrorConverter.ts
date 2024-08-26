/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinUserVerificationError } from './PinUserVerificationError';
import { PinUserVerificationInvalidPin } from './PinUserVerificationInvalidPin';
import { ErrorConverter } from '../ErrorConverter';

enum PinUserVerificationErrorType {
	InvalidPin,
}

export class PinUserVerificationErrorConverter extends ErrorConverter<PinUserVerificationError> {
	convert(): PinUserVerificationError {
		const subtype =
			PinUserVerificationErrorType[
				this.error.type as keyof typeof PinUserVerificationErrorType
			];
		switch (subtype) {
			case PinUserVerificationErrorType.InvalidPin:
				return new PinUserVerificationInvalidPin(this.error.description, this.error.cause);
		}
	}
}
