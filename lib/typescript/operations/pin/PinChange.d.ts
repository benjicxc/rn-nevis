/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { PinChanger } from './PinChanger';
import type { PinChangeError } from '../../error/pin/change/PinChangeError';
import { Operation } from '../Operation';
/**
 * The object that can be used to change the PIN.
 *
 * Usage example:
 * ```ts
 * class PinChangerImpl implements PinChanger {
 *     async changePin(context: PinChangeContext, handler: PinChangeHandler) {
 *         handler.pins(oldPin, newPin);
 *     }
 * }
 *
 * [...]
 * async pinChange({
 *     client: MobileAuthenticationClient,
 *     username: string,
 * }): Promise<void> {
 *     await client.operations.pinChange
 *         .username(username)
 *         .pinChanger(PinChangerImpl(...))
 *         .onSuccess(() {
 *             // handle success
 *         })
 *         .onError((error) {
 *             // handle error
 *         })
 *         .execute();
 * }
 * [...]
 * ```
 */
export declare abstract class PinChange extends Operation {
    /**
     * The username whose PIN must be changed.
     *
     * **IMPORTANT** \
     * Providing the {@link username} is required.
     *
     * @param username the username.
     * @returns a {@link PinChange} object.
     */
    abstract username(username: string): PinChange;
    /**
     * Specifies the object that will take care of changing the PIN of the specified
     * username.
     *
     * **IMPORTANT** \
     * Providing the {@link pinChanger} is required.
     *
     * @param pinChanger the {@link pinChanger}
     * @returns a {@link PinChange} object.
     */
    abstract pinChanger(pinChanger: PinChanger): PinChange;
    /**
     * Specifies the object that will be invoked if the PIN was successfully modified.
     *
     * **IMPORTANT** \
     * Providing the {@link onSuccess} is required.
     *
     * @param onSuccess the callback which is invoked on successful PIN modification.
     * @returns a {@link PinChange} object.
     */
    abstract onSuccess(onSuccess: () => void): PinChange;
    /**
     * Specifies the object that will be invoked when the PIN could not be changed:
     * the PIN was not enrolled, the PIN is locked or the operation was canceled.
     *
     * **IMPORTANT** \
     * Providing the {@link onError} is required.
     *
     * Params:
     *   - onError: the callback which receives a {@link PinChangeError}.
     *
     * @param onError
     * @returns a {@link PinChange} object.
     */
    abstract onError(onError: (error: PinChangeError) => void): PinChange;
}
export declare class PinChangeImpl extends PinChange {
    private _username?;
    private _pinChanger?;
    private _onSuccess?;
    private _onError?;
    username(username: string): PinChange;
    pinChanger(pinChanger: PinChanger): PinChange;
    onSuccess(onSuccess: () => void): PinChange;
    onError(onError: (error: PinChangeError) => void): PinChange;
    execute(): Promise<void>;
}
//# sourceMappingURL=PinChange.d.ts.map