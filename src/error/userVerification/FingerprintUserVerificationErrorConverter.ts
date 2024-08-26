/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { FingerprintUserVerificationError } from './FingerprintUserVerificationError';
import { ErrorConverter } from '../ErrorConverter';

export class FingerprintUserVerificationErrorConverter extends ErrorConverter<FingerprintUserVerificationError> {
	convert(): FingerprintUserVerificationError {
		return new FingerprintUserVerificationError(
			this.error.description,
			this.error.cause,
			this.error.message
		);
	}
}
