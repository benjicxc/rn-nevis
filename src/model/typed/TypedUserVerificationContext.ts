/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { BiometricUserVerificationContext } from '../../operations/userverification/BiometricUserVerificationContext';
import { DevicePasscodeUserVerificationContext } from '../../operations/userverification/DevicePasscodeUserVerificationContext';
import { FingerprintUserVerificationContext } from '../../operations/userverification/FingerprintUserVerificationContext';
import { PinUserVerificationContext } from '../../operations/userverification/PinUserVerificationContext';
import { UserVerificationContext } from '../../operations/userverification/UserVerificationContext';

enum UserVerificationContextType {
	PinUserVerificationContext,
	BiometricUserVerificationContext,
	DevicePasscodeUserVerificationContext,
	FingerprintUserVerificationContext,
}

export class TypedUserVerificationContext {
	wrapped: UserVerificationContext;

	constructor(userVerificationContext: UserVerificationContext) {
		this.wrapped = userVerificationContext;
	}

	static fromJson(json: any): TypedUserVerificationContext {
		const subtype =
			UserVerificationContextType[json.type as keyof typeof UserVerificationContextType];
		switch (subtype) {
			case UserVerificationContextType.PinUserVerificationContext:
				return new TypedUserVerificationContext(
					PinUserVerificationContext.fromJson(json.data)
				);
			case UserVerificationContextType.BiometricUserVerificationContext:
				return new TypedUserVerificationContext(
					BiometricUserVerificationContext.fromJson(json.data)
				);
			case UserVerificationContextType.DevicePasscodeUserVerificationContext:
				return new TypedUserVerificationContext(
					DevicePasscodeUserVerificationContext.fromJson(json.data)
				);
			case UserVerificationContextType.FingerprintUserVerificationContext:
				return new TypedUserVerificationContext(
					FingerprintUserVerificationContext.fromJson(json.data)
				);
			default:
				throw new Error(`Unknown user verification context (${json.type}).`);
		}
	}
}
