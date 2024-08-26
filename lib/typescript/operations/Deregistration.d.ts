/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import type { AuthorizationProvider } from '../authorization/AuthorizationProvider';
import { OperationError } from '../error/operation/OperationError';
/**
 * The object that can be used to trigger a deregistration operation.
 *
 * Usage example:
 * ```ts
 *   [...]
 *   async deregister(
 *       client: MobileAuthenticationClient,
 *       username: string,
 *       aaid: string
 *   ): Promise<void> {
 *       await client.operations.deregistration
 *           .username(username)
 *           .aaid(aaid)
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *   }
 *   [...]
 * ```
 */
export declare abstract class Deregistration extends HttpOperation<Deregistration> {
    /**
     * Specifies the username that must be deregistered.
     *
     * **IMPORTANT** \
     * Providing the {@link username} is required.
     *
     * @param username the username.
     * @returns a {@link Deregistration} object.
     */
    abstract username(username: string): Deregistration;
    /**
     * Specifies the AAID of the {@link Authenticator} that must be deregistered.
     *
     * **NOTE** \
     * If no AAID is provided then all authenticators will be deregistered.

     * @param aaid the AAID of the authenticator to be deregistered.
     * @returns a {@link Deregistration} object.
     */
    abstract aaid(aaid: string): Deregistration;
    /**
     * Specifies the {@link AuthorizationProvider} provider to be used to deregister the authenticator.
     *
     * **NOTE** \
     * This doesn't have to be provided on Authentication Cloud environment.
     *
     * @param authorizationProvider {@link AuthorizationProvider}.
     * @returns a {@link Deregistration} object.
     */
    abstract authorizationProvider(authorizationProvider: AuthorizationProvider): Deregistration;
    /**
     * Specifies the object that will be invoked if the authenticator was deleted
     * successfully.
     *
     * **IMPORTANT** \
     * Providing the {@link onSuccess} is required.
     *
     * @param onSuccess the function which is invoked on successful deregistration.
     * @returns a {@link Deregistration} object.
     */
    abstract onSuccess(onSuccess: () => void): Deregistration;
    /**
     * Specifies the object that will be invoked if the deregistration failed.
     *
     * **IMPORTANT** \
     * Providing the {@link onError} is required.
     *
     * @param onError the function which receives an {@link OperationError}.
     * @returns a {@link Deregistration} object.
     */
    abstract onError(onError: (error: OperationError) => void): Deregistration;
}
export declare class DeregistrationImpl extends HttpOperationImpl<Deregistration> implements Deregistration {
    private _username?;
    private _aaid?;
    private _authorizationProvider?;
    private _onSuccess?;
    private _onError?;
    aaid(aaid: string): Deregistration;
    username(username: string): Deregistration;
    authorizationProvider(authorizationProvider: AuthorizationProvider): Deregistration;
    onError(onError: (error: OperationError) => void): Deregistration;
    onSuccess(onSuccess: () => void): Deregistration;
    execute(): Promise<void>;
}
//# sourceMappingURL=Deregistration.d.ts.map