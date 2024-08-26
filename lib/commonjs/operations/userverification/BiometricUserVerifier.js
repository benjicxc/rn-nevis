"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BiometricUserVerifier = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object in charge of interacting with the user to do biometric authentication.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK if the biometric authenticator is required.
 *
 * @see
 * - {@link Registration.biometricUserVerifier}
 * - {@link Authentication.biometricUserVerifier}
 * - {@link AuthCloudApiRegistration.biometricUserVerifier}
 * - {@link OutOfBandRegistration.biometricUserVerifier}
 * - {@link OutOfBandAuthentication.biometricUserVerifier}
 */
class BiometricUserVerifier {}
exports.BiometricUserVerifier = BiometricUserVerifier;
//# sourceMappingURL=BiometricUserVerifier.js.map