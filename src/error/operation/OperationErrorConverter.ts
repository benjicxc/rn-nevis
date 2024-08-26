/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationDeviceProtectionError } from './OperationDeviceProtectionError';
import { OperationError } from './OperationError';
import { OperationFidoError } from './OperationFidoError';
import { OperationNetworkError } from './OperationNetworkError';
import { OperationNoDeviceLockError } from './OperationNoDeviceLockError';
import { OperationUnknownError } from './OperationUnknownError';
import { OperationUserAlreadyRegisteredInAnotherServerError } from './OperationUserAlreadyRegisteredInAnotherServerError';
import { OperationUserNotRegisteredInServerError } from './OperationUserNotRegisteredInServerError';
import { ErrorConverter } from '../ErrorConverter';

enum OperationErrorType {
	DeviceProtectionError,
	FidoError,
	NetworkError,
	NoDeviceLockError,
	Unknown,
	UserAlreadyRegisteredInAnotherServer,
	UserNotRegisteredInServer,
}

export class OperationErrorConverter extends ErrorConverter<OperationError> {
	convert(): OperationError {
		const subtype = OperationErrorType[this.error.type as keyof typeof OperationErrorType];
		switch (subtype) {
			case OperationErrorType.DeviceProtectionError:
				return new OperationDeviceProtectionError(this.error.description, this.error.cause);
			case OperationErrorType.FidoError: {
				if (this.error.errorCode) {
					return new OperationFidoError(
						this.error.errorCode,
						this.error.description,
						this.error.cause
					);
				}

				return new OperationUnknownError(this.error.description, this.error.cause);
			}
			case OperationErrorType.NetworkError:
				return new OperationNetworkError(this.error.description, this.error.cause);
			case OperationErrorType.NoDeviceLockError:
				return new OperationNoDeviceLockError(this.error.description, this.error.cause);
			case OperationErrorType.Unknown:
				return new OperationUnknownError(this.error.description, this.error.cause);
			case OperationErrorType.UserAlreadyRegisteredInAnotherServer:
				return new OperationUserAlreadyRegisteredInAnotherServerError(
					this.error.description,
					this.error.cause
				);
			case OperationErrorType.UserNotRegisteredInServer:
				return new OperationUserNotRegisteredInServerError(
					this.error.description,
					this.error.cause
				);
		}
	}
}
