/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Platform } from 'react-native';

/**
 * The authenticator attestation identifier: a unique identifier assigned to a model,
 * class or batch of FIDO Authenticators that all share the same characteristics, and which a
 * Relying Party can use to look up an Attestation Public Key and Authenticator Metadata for the
 * device.
 *
 * The AAID is a string with format "V#M", where:
 *  - "#" is a separator.
 *  - "V" indicates the authenticator Vendor Code. This code consists of 4 hexadecimal digits.
 *  - "M" indicates the authenticator Model Code. This code consists of 4 hexadecimal digits.
 */
export class Aaid {
	/**
	 * The name of the Aaid.
	 */
	readonly name: string;

	/**
	 * The ordinal of the Aaid.
	 */
	readonly ordinal: number;

	private static aaidAndroid = ['F1D0#0001', 'F1D0#0002', 'F1D0#0003', 'F1D0#0004'];
	private static aaidiOS = ['F1D0#1001', 'F1D0#1002', 'F1D0#1003', 'F1D0#1004'];

	private constructor(name: string, ordinal: number) {
		this.name = name;
		this.ordinal = ordinal;
	}

	/**
	 * Represents the PIN authenticator.
	 */
	static get PIN(): Aaid {
		return new Aaid('PIN', 0);
	}

	/**
	 * Represents the fingerprint authenticator.
	 *
	 * @remarks
	 * - Android: this represents the legacy Fingerprint authenticator.
	 * - iOS: not supported.
	 */
	static get FINGERPRINT(): Aaid {
		return new Aaid('FINGERPRINT', 1);
	}

	/**
	 * Represents the biometric authenticator.
	 *
	 * @remarks
	 * - Android: represents the Biometric authenticator.
	 * - iOS: represents both the Touch ID and the Face ID authenticator, as only one of them exists
	 * in a device.
	 */
	static get BIOMETRIC(): Aaid {
		return new Aaid('BIOMETRIC', 2);
	}

	/**
	 * Represents the device passcode authenticator.
	 */
	static get DEVICE_PASSCODE(): Aaid {
		return new Aaid('DEVICE_PASSCODE', 3);
	}

	/**
	 * The function that returns the Authenticator Attestation ID for an authenticator
	 * taking into consideration the current platform.
	 *
	 * @example
	 * ```ts
	 * let pinAuthenticatorAaid = Aaid.PIN.rawValue()
	 *
	 * // Returns F1D0#0001 on Android
	 * // Returns F1D0#1001 on iOS
	 * ```
	 */
	rawValue(): string {
		return Platform.select({
			ios: () => {
				return Aaid.aaidiOS[this.ordinal]!;
			},
			android: () => {
				return Aaid.aaidAndroid[this.ordinal]!;
			},
			default: () => {
				return '';
			},
		})();
	}
}
