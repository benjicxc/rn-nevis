/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiDecryptionError } from './AuthCloudApiDecryptionError';
import { AuthCloudApiDeviceProtectionError } from './AuthCloudApiDeviceProtectionError';
import type { AuthCloudApiError } from './AuthCloudApiError';
import { AuthCloudApiFidoError } from './AuthCloudApiFidoError';
import { AuthCloudApiMalformedPayload } from './AuthCloudApiMalformedPayload';
import { AuthCloudApiNetworkError } from './AuthCloudApiNetworkError';
import { AuthCloudApiNoDeviceLockError } from './AuthCloudApiNoDeviceLockError';
import { AuthCloudApiTokenAlreadyRedeemed } from './AuthCloudApiTokenAlreadyRedeemed';
import { AuthCloudApiTokenExpired } from './AuthCloudApiTokenExpired';
import { AuthCloudApiUnknownError } from './AuthCloudApiUnknownError';
import { AuthCloudApiUserAlreadyRegisteredInAnotherServerError } from './AuthCloudApiUserAlreadyRegisteredInAnotherServerError';
import { ErrorConverter } from '../ErrorConverter';

enum AuthCloudApiErrorType {
	DecryptionError,
	DeviceProtectionError,
	FidoError,
	MalformedPayload,
	NetworkError,
	NoDeviceLockError,
	TokenAlreadyRedeemed,
	TokenExpired,
	Unknown,
	UserAlreadyRegisteredInAnotherServer,
}

export class AuthCloudApiErrorConverter extends ErrorConverter<AuthCloudApiError> {
	convert(): AuthCloudApiError {
		const subtype =
			AuthCloudApiErrorType[this.error.type as keyof typeof AuthCloudApiErrorType];
		switch (subtype) {
			case AuthCloudApiErrorType.DecryptionError:
				return new AuthCloudApiDecryptionError(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.DeviceProtectionError:
				return new AuthCloudApiDeviceProtectionError(
					this.error.description,
					this.error.cause
				);
			case AuthCloudApiErrorType.FidoError: {
				if (this.error.errorCode) {
					return new AuthCloudApiFidoError(
						this.error.errorCode,
						this.error.description,
						this.error.cause
					);
				}

				return new AuthCloudApiUnknownError(this.error.description, this.error.cause);
			}
			case AuthCloudApiErrorType.MalformedPayload:
				return new AuthCloudApiMalformedPayload(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.NetworkError:
				return new AuthCloudApiNetworkError(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.NoDeviceLockError:
				return new AuthCloudApiNoDeviceLockError(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.TokenAlreadyRedeemed:
				return new AuthCloudApiTokenAlreadyRedeemed(
					this.error.description,
					this.error.cause
				);
			case AuthCloudApiErrorType.TokenExpired:
				return new AuthCloudApiTokenExpired(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.Unknown:
				return new AuthCloudApiUnknownError(this.error.description, this.error.cause);
			case AuthCloudApiErrorType.UserAlreadyRegisteredInAnotherServer:
				return new AuthCloudApiUserAlreadyRegisteredInAnotherServerError(
					this.error.description,
					this.error.cause
				);
		}
	}
}
