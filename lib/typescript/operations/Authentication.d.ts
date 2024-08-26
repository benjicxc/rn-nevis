/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import type { RetryPolicy } from './RetryPolicy';
import { PinUserVerifier } from './userverification/PinUserVerifier';
import type { AuthorizationProvider } from '../authorization/AuthorizationProvider';
import type { SessionProvider } from '../authorization/SessionProvider';
import { AuthenticationError } from '../error/authentication/AuthenticationError';
import { AuthenticatorSelector } from '../operations/selection/AuthenticatorSelector';
import { BiometricUserVerifier } from '../operations/userverification/BiometricUserVerifier';
import { DevicePasscodeUserVerifier } from '../operations/userverification/DevicePasscodeUserVerifier';
import { FingerprintUserVerifier } from '../operations/userverification/FingerprintUserVerifier';
/**
 * The object that can be used to trigger an authentication operation.
 *
 * Usage example:
 * ```ts
 *  class AuthenticatorSelectorImpl extends AuthenticatorSelector {
 *      async selectAuthenticator(
 *          context: AuthenticatorSelectionContext,
 *          handler: AuthenticatorSelectionHandler,
 *      ): Promise<void> {
 *          await handler.aaid(aaid).catch(console.error);
 *      }
 *  }
 *
 *  class PinUserVerifierImpl extends PinUserVerifier {
 *      async verifyPin(
 *          context: PinUserVerificationContext,
 *          handler: PinUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyPin(pin).catch(console.error);
 *      }
 *  }
 *
 *  class BiometricUserVerifierImpl implements BiometricUserVerifier {
 *      async verifyBiometric(
 *          context: BiometricUserVerificationContext,
 *          handler: BiometricUserVerificationHandler,
 *      ): Promise<void> {
 *          await handler.verifyBiometric().catch(console.error);
 *      }
 *  }
 *
 *  [...]
 *  async function authenticate(
 *      client: MobileAuthenticationClient,
 *      username: string,
 *      sessionProvider?: SessionProvider,
 *  ): Promise<void> {
 *      await client.operations.authentication
 *          .username(username)
 *          .sessionProvider(sessionProvider)
 *          .authenticatorSelector(AuthenticatorSelectorImpl(...))
 *          .pinUserVerifier(PinUserVerifierImpl(...))
 *          .biometricUserVerifier(BiometricUserVerifierImpl(...))
 *          .onSuccess((authorizationProvider) {
 *              // handle success
 *          })
 *          .onError((error) {
 *              // handle error
 *          })
 *          .execute();
 *  }
 *  [...]
 * ```
 */
export declare abstract class Authentication extends HttpOperation<Authentication> {
    /**
     * Specifies the username that must be used to authenticate.
     *
     * **IMPORTANT** \
     * Providing the {@link username} is required.
     *
     * @param username the username.
     * @returns the {@link Authentication} object.
     */
    abstract username(username: string): Authentication;
    /**
     * Specifies the session provider that must be used to authenticate.
     *
     * @param sessionProvider the {@link SessionProvider}.
     * @returns the {@link Authentication} object.
     */
    abstract sessionProvider(sessionProvider: SessionProvider): Authentication;
    /**
     * The retry policy to be used to obtain an {@link AuthorizationProvider} after the
     * user authenticates successfully. If obtaining an {@link AuthorizationProvider}
     * fails on the first try, the SDK will retry according to the provided {@link RetryPolicy}.
     * This policy is used when the backend is the Identity Suite and cookies are
     * created after a successful authentication.
     *
     * @param retryPolicy the retry policy to be used when retrieving the {@link AuthorizationProvider}.
     * By default, the code will retry 3 times with a time interval of 1 second
     * between tries.
     * @returns the {@link Authentication} object.
     */
    abstract retryPolicyObtainingAuthorizationProvider(retryPolicy: RetryPolicy): Authentication;
    /**
     * Specifies the object that will take care of the selection of the authenticator
     * to be used.
     *
     * **IMPORTANT** \
     * Providing the authenticator selector is required.
     *
     * @param authenticatorSelector the {@link AuthenticatorSelector}.
     * @returns the {@link Authentication} object.
     */
    abstract authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Authentication;
    /**
     * Specifies the object that will take care of the PIN user verification.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link PinUserVerifier}, {@link BiometricUserVerifier} or
     * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
     *
     * @param pinUserVerifier the {@link PinUserVerifier}.
     * @returns the {@link Authentication} object.
     */
    abstract pinUserVerifier(pinUserVerifier: PinUserVerifier): Authentication;
    /**
     * Specifies the object that will take care of the biometric user verification.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link PinUserVerifier}, {@link BiometricUserVerifier} or
     * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
     *
     * @param biometricUserVerifier the {@link BiometricUserVerifier}.
     * @returns the {@link Authentication} object.
     */
    abstract biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Authentication;
    /**
     * Specifies the object that will take care of the device passcode user verification.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
     * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
     *
     * @param devicePasscodeUserVerifier the {@link DevicePasscodeUserVerifier}.
     * @returns the {@link Authentication} object.
     */
    abstract devicePasscodeUserVerifier(devicePasscodeUserVerifier: DevicePasscodeUserVerifier): Authentication;
    /**
     * Specifies the object that will take care of the fingerprint user verification.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link PinEnroller}, {@link BiometricUserVerifier},
     * {@link DevicePasscodeUserVerifier} or {@link FingerprintUserVerifier} is required.
     *
     * @param fingerprintUserVerifier the {@link FingerprintUserVerifier}.
     * @returns the {@link Authentication} object.
     */
    abstract fingerprintUserVerifier(fingerprintUserVerifier: FingerprintUserVerifier): Authentication;
    /**
     * Specifies the object that will be invoked if the authentication was successful.
     *
     * **IMPORTANT** \
     * Providing the {@link onSuccess} is required.
     *
     * @param onSuccess the callback which receives an optional {@link AuthorizationProvider}.
     * @returns the {@link Authentication} object.
     */
    abstract onSuccess(onSuccess: (authorizationProvider?: AuthorizationProvider) => void): Authentication;
    /**
     * Specifies the object that will be invoked if the authentication failed.
     *
     * **IMPORTANT** \
     * Providing the {@link onError} is required.
     *
     * @param onError the function which receives an {@link AuthenticationError}.
     * @returns the {@link Authentication} object.
     */
    abstract onError(onError: (error: AuthenticationError) => void): Authentication;
}
export declare class AuthenticationImpl extends HttpOperationImpl<Authentication> implements Authentication {
    private _username?;
    private _sessionProvider?;
    private _retryPolicyObtainingAuthorizationProvider?;
    private _authenticatorSelector?;
    private _pinUserVerifier?;
    private _biometricUserVerifier?;
    private _devicePasscodeUserVerifier?;
    private _fingerprintUserVerifier?;
    private _onSuccess?;
    private _onError?;
    username(username: string): Authentication;
    sessionProvider(sessionProvider: SessionProvider): this;
    retryPolicyObtainingAuthorizationProvider(retryPolicy: RetryPolicy): Authentication;
    authenticatorSelector(authenticatorSelector: AuthenticatorSelector): Authentication;
    pinUserVerifier(pinUserVerifier: PinUserVerifier): Authentication;
    biometricUserVerifier(biometricUserVerifier: BiometricUserVerifier): Authentication;
    devicePasscodeUserVerifier(devicePasscodeUserVerifier: DevicePasscodeUserVerifier): Authentication;
    fingerprintUserVerifier(fingerprintUserVerifier: FingerprintUserVerifier): Authentication;
    onSuccess(onSuccess: (authorizationProvider?: AuthorizationProvider) => void): Authentication;
    onError(onError: (error: AuthenticationError) => void): Authentication;
    execute(): Promise<void>;
}
//# sourceMappingURL=Authentication.d.ts.map