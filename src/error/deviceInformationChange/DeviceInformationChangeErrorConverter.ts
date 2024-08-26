/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { DeviceInformationChangeDeviceProtectionError } from './DeviceInformationChangeDeviceProtectionError';
import type { DeviceInformationChangeError } from './DeviceInformationChangeError';
import { DeviceInformationChangeNameAlreadyExists } from './DeviceInformationChangeNameAlreadyExists';
import { DeviceInformationChangeNetworkError } from './DeviceInformationChangeNetworkError';
import { DeviceInformationChangeNoDeviceLockError } from './DeviceInformationChangeNoDeviceLockError';
import { DeviceInformationChangeNotFound } from './DeviceInformationChangeNotFound';
import { DeviceInformationChangeSigningError } from './DeviceInformationChangeSigningError';
import { DeviceInformationChangeUnknownError } from './DeviceInformationChangeUnknownError';
import { ErrorConverter } from '../ErrorConverter';

enum DeviceInformationChangeErrorType {
	DeviceProtectionError,
	NameAlreadyExists,
	NetworkError,
	NoDeviceLockError,
	NotFound,
	SigningError,
	Unknown,
}

export class DeviceInformationChangeErrorConverter extends ErrorConverter<DeviceInformationChangeError> {
	convert(): DeviceInformationChangeError {
		const subtype =
			DeviceInformationChangeErrorType[
				this.error.type as keyof typeof DeviceInformationChangeErrorType
			];
		switch (subtype) {
			case DeviceInformationChangeErrorType.DeviceProtectionError:
				return new DeviceInformationChangeDeviceProtectionError(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.NameAlreadyExists:
				return new DeviceInformationChangeNameAlreadyExists(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.NetworkError:
				return new DeviceInformationChangeNetworkError(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.NoDeviceLockError:
				return new DeviceInformationChangeNoDeviceLockError(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.NotFound:
				return new DeviceInformationChangeNotFound(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.SigningError:
				return new DeviceInformationChangeSigningError(
					this.error.description,
					this.error.cause
				);
			case DeviceInformationChangeErrorType.Unknown:
				return new DeviceInformationChangeUnknownError(
					this.error.description,
					this.error.cause
				);
		}
	}
}
