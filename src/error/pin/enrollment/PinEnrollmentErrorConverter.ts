/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinEnrollmentError } from './PinEnrollmentError';
import { PinEnrollmentInvalidPinFormat } from './PinEnrollmentInvalidPinFormat';
import { ErrorConverter } from '../../ErrorConverter';

enum PinEnrollmentErrorType {
	InvalidPinFormat,
}

export class PinEnrollmentErrorConverter extends ErrorConverter<PinEnrollmentError> {
	convert(): PinEnrollmentError {
		const subtype =
			PinEnrollmentErrorType[this.error.type as keyof typeof PinEnrollmentErrorType];
		switch (subtype) {
			case PinEnrollmentErrorType.InvalidPinFormat:
				return new PinEnrollmentInvalidPinFormat(this.error.description, this.error.cause);
		}
	}
}
