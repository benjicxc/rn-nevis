/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
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
export declare class Aaid {
    /**
     * The name of the Aaid.
     */
    readonly name: string;
    /**
     * The ordinal of the Aaid.
     */
    readonly ordinal: number;
    private static aaidAndroid;
    private static aaidiOS;
    private constructor();
    /**
     * Represents the PIN authenticator.
     */
    static get PIN(): Aaid;
    /**
     * Represents the fingerprint authenticator.
     *
     * @remarks
     * - Android: this represents the legacy Fingerprint authenticator.
     * - iOS: not supported.
     */
    static get FINGERPRINT(): Aaid;
    /**
     * Represents the biometric authenticator.
     *
     * @remarks
     * - Android: represents the Biometric authenticator.
     * - iOS: represents both the Touch ID and the Face ID authenticator, as only one of them exists
     * in a device.
     */
    static get BIOMETRIC(): Aaid;
    /**
     * Represents the device passcode authenticator.
     */
    static get DEVICE_PASSCODE(): Aaid;
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
    rawValue(): string;
}
//# sourceMappingURL=Aaid.d.ts.map