/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandPayloadDecryptionError } from './OutOfBandPayloadDecryptionError';
import { OutOfBandPayloadDeviceProtectionError } from './OutOfBandPayloadDeviceProtectionError';
import type { OutOfBandPayloadError } from './OutOfBandPayloadError';
import { OutOfBandPayloadMalformedPayload } from './OutOfBandPayloadMalformedPayload';
import { OutOfBandPayloadNoDeviceLockError } from './OutOfBandPayloadNoDeviceLockError';
import { OutOfBandPayloadUnknownError } from './OutOfBandPayloadUnknownError';
import { ErrorConverter } from '../../ErrorConverter';

enum OutOfBandPayloadErrorType {
	DecryptionError,
	DeviceProtectionError,
	MalformedPayload,
	NoDeviceLockError,
	Unknown,
}

export class OutOfBandPayloadErrorConverter extends ErrorConverter<OutOfBandPayloadError> {
	convert(): OutOfBandPayloadError {
		const subtype =
			OutOfBandPayloadErrorType[this.error.type as keyof typeof OutOfBandPayloadErrorType];
		switch (subtype) {
			case OutOfBandPayloadErrorType.DecryptionError:
				return new OutOfBandPayloadDecryptionError(
					this.error.description,
					this.error.cause
				);
			case OutOfBandPayloadErrorType.DeviceProtectionError:
				return new OutOfBandPayloadDeviceProtectionError(
					this.error.description,
					this.error.cause
				);
			case OutOfBandPayloadErrorType.MalformedPayload:
				return new OutOfBandPayloadMalformedPayload(
					this.error.description,
					this.error.cause
				);
			case OutOfBandPayloadErrorType.NoDeviceLockError:
				return new OutOfBandPayloadNoDeviceLockError(
					this.error.description,
					this.error.cause
				);
			case OutOfBandPayloadErrorType.Unknown:
				return new OutOfBandPayloadUnknownError(this.error.description, this.error.cause);
		}
	}
}
