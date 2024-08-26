/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthenticationDeviceProtectionError } from './AuthenticationDeviceProtectionError';
import type { AuthenticationError } from './AuthenticationError';
import { AuthenticationFidoError } from './AuthenticationFidoError';
import { AuthenticationNetworkError } from './AuthenticationNetworkError';
import { AuthenticationNoDeviceLockError } from './AuthenticationNoDeviceLockError';
import { AuthenticationUnknownError } from './AuthenticationUnknownError';
import { ErrorConverter } from '../ErrorConverter';

enum AuthenticationErrorType {
	DeviceProtectionError,
	FidoError,
	NetworkError,
	NoDeviceLockError,
	Unknown,
}

export class AuthenticationErrorConverter extends ErrorConverter<AuthenticationError> {
	convert(): AuthenticationError {
		const subtype =
			AuthenticationErrorType[this.error.type as keyof typeof AuthenticationErrorType];
		switch (subtype) {
			case AuthenticationErrorType.DeviceProtectionError:
				return new AuthenticationDeviceProtectionError(
					this.error.description,
					this.error.cause,
					this.error.sessionProvider
				);
			case AuthenticationErrorType.FidoError: {
				if (this.error.errorCode) {
					return new AuthenticationFidoError(
						this.error.errorCode,
						this.error.description,
						this.error.cause,
						this.error.sessionProvider
					);
				}

				return new AuthenticationUnknownError(
					this.error.description,
					this.error.cause,
					this.error.sessionProvider
				);
			}
			case AuthenticationErrorType.NetworkError:
				return new AuthenticationNetworkError(
					this.error.description,
					this.error.cause,
					this.error.sessionProvider
				);
			case AuthenticationErrorType.NoDeviceLockError:
				return new AuthenticationNoDeviceLockError(
					this.error.description,
					this.error.cause,
					this.error.sessionProvider
				);
			case AuthenticationErrorType.Unknown:
				return new AuthenticationUnknownError(
					this.error.description,
					this.error.cause,
					this.error.sessionProvider
				);
		}
	}
}
