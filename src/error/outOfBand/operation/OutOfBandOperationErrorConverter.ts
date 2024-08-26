/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandOperationDeviceProtectionError } from './OutOfBandOperationDeviceProtectionError';
import type { OutOfBandOperationError } from './OutOfBandOperationError';
import { OutOfBandOperationNetworkError } from './OutOfBandOperationNetworkError';
import { OutOfBandOperationNoDeviceLockError } from './OutOfBandOperationNoDeviceLockError';
import { OutOfBandOperationTokenAlreadyRedeemed } from './OutOfBandOperationTokenAlreadyRedeemed';
import { OutOfBandOperationTokenExpired } from './OutOfBandOperationTokenExpired';
import { OutOfBandOperationUnknownError } from './OutOfBandOperationUnknownError';
import { ErrorConverter } from '../../ErrorConverter';

enum OutOfBandOperationErrorType {
	DeviceProtectionError,
	NetworkError,
	NoDeviceLockError,
	TokenAlreadyRedeemed,
	TokenExpired,
	Unknown,
}

export class OutOfBandOperationErrorConverter extends ErrorConverter<OutOfBandOperationError> {
	convert(): OutOfBandOperationError {
		const subtype =
			OutOfBandOperationErrorType[
				this.error.type as keyof typeof OutOfBandOperationErrorType
			];
		switch (subtype) {
			case OutOfBandOperationErrorType.DeviceProtectionError:
				return new OutOfBandOperationDeviceProtectionError(
					this.error.description,
					this.error.cause
				);
			case OutOfBandOperationErrorType.NetworkError:
				return new OutOfBandOperationNetworkError(this.error.description, this.error.cause);
			case OutOfBandOperationErrorType.NoDeviceLockError:
				return new OutOfBandOperationNoDeviceLockError(
					this.error.description,
					this.error.cause
				);
			case OutOfBandOperationErrorType.TokenAlreadyRedeemed:
				return new OutOfBandOperationTokenAlreadyRedeemed(
					this.error.description,
					this.error.cause
				);
			case OutOfBandOperationErrorType.TokenExpired:
				return new OutOfBandOperationTokenExpired(this.error.description, this.error.cause);
			case OutOfBandOperationErrorType.Unknown:
				return new OutOfBandOperationUnknownError(this.error.description, this.error.cause);
		}
	}
}
