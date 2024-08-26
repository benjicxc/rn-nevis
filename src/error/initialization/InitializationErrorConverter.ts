/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';
import { InitializationError } from './InitializationError';
import { InitializationHardwareError } from './InitializationHardwareError';
import { InitializationLockScreenHasChangedError } from './InitializationLockScreenHasChangedError';
import { InitializationNoDeviceLockError } from './InitializationNoDeviceLockError';
import { InitializationRootedError } from './InitializationRootedError';
import { InitializationUnknownError } from './InitializationUnknownError';
import { ErrorConverter } from '../ErrorConverter';

enum InitializationErrorType {
	DeviceProtectionError,
	HardwareError,
	LockScreenHasChangedError,
	NoDeviceLockError,
	RootedError,
	Unknown,
}

export class InitializationErrorConverter extends ErrorConverter<InitializationError> {
	convert(): InitializationError {
		const subtype =
			InitializationErrorType[this.error.type as keyof typeof InitializationErrorType];
		switch (subtype) {
			case InitializationErrorType.DeviceProtectionError:
				return new InitializationDeviceProtectionError(
					this.error.description,
					this.error.cause
				);
			case InitializationErrorType.HardwareError:
				return new InitializationHardwareError(this.error.description, this.error.cause);
			case InitializationErrorType.LockScreenHasChangedError:
				return new InitializationLockScreenHasChangedError(
					this.error.description,
					this.error.cause
				);
			case InitializationErrorType.NoDeviceLockError:
				return new InitializationNoDeviceLockError(
					this.error.description,
					this.error.cause
				);
			case InitializationErrorType.RootedError:
				return new InitializationRootedError(this.error.description, this.error.cause);
			case InitializationErrorType.Unknown:
				return new InitializationUnknownError(this.error.description, this.error.cause);
		}
	}
}
