/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinChangeDeviceProtectionError } from './PinChangeDeviceProtectionError';
import { PinChangeError } from './PinChangeError';
import { PinChangeNoDeviceLockError } from './PinChangeNoDeviceLockError';
import { PinChangePinLocked } from './PinChangePinLocked';
import { PinChangePinNotEnrolled } from './PinChangePinNotEnrolled';
import { PinChangeUnknownError } from './PinChangeUnknownError';
import { PinChangeUserCanceled } from './PinChangeUserCanceled';
import { ErrorConverter } from '../../ErrorConverter';

enum PinChangeErrorType {
	DeviceProtectionError,
	NoDeviceLockError,
	PinLocked,
	PinNotEnrolled,
	Unknown,
	UserCanceled,
}

export class PinChangeErrorConverter extends ErrorConverter<PinChangeError> {
	convert(): PinChangeError {
		const subtype = PinChangeErrorType[this.error.type as keyof typeof PinChangeErrorType];
		switch (subtype) {
			case PinChangeErrorType.DeviceProtectionError:
				return new PinChangeDeviceProtectionError(this.error.description, this.error.cause);
			case PinChangeErrorType.NoDeviceLockError:
				return new PinChangeNoDeviceLockError(this.error.description, this.error.cause);
			case PinChangeErrorType.PinLocked:
				return new PinChangePinLocked(this.error.description, this.error.cause);
			case PinChangeErrorType.PinNotEnrolled:
				return new PinChangePinNotEnrolled(this.error.description, this.error.cause);
			case PinChangeErrorType.Unknown:
				return new PinChangeUnknownError(this.error.description, this.error.cause);
			case PinChangeErrorType.UserCanceled:
				return new PinChangeUserCanceled(this.error.description, this.error.cause);
		}
	}
}
