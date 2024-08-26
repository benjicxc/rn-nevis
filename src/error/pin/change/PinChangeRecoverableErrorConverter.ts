/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { PinChangeRecoverableError } from './PinChangeRecoverableError';
import { PinChangeRecoverableInvalidPin } from './PinChangeRecoverableInvalidPin';
import { PinChangeRecoverableInvalidPinFormat } from './PinChangeRecoverableInvalidPinFormat';
import { PinChangeRecoverableOldPinEqualsNewPin } from './PinChangeRecoverableOldPinEqualsNewPin';
import { ErrorConverter } from '../../ErrorConverter';

enum PinChangeRecoverableErrorType {
	InvalidPin,
	InvalidPinFormat,
	OldPinEqualsNewPin,
}

export class PinChangeRecoverableErrorConverter extends ErrorConverter<PinChangeRecoverableError> {
	convert(): PinChangeRecoverableError {
		const subtype =
			PinChangeRecoverableErrorType[
				this.error.type as keyof typeof PinChangeRecoverableErrorType
			];
		switch (subtype) {
			case PinChangeRecoverableErrorType.InvalidPin:
				return new PinChangeRecoverableInvalidPin(this.error.description, this.error.cause);
			case PinChangeRecoverableErrorType.InvalidPinFormat:
				return new PinChangeRecoverableInvalidPinFormat(
					this.error.description,
					this.error.cause
				);
			case PinChangeRecoverableErrorType.OldPinEqualsNewPin:
				return new PinChangeRecoverableOldPinEqualsNewPin(
					this.error.description,
					this.error.cause
				);
		}
	}
}
