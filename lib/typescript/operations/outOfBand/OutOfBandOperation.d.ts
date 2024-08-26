/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { OutOfBandAuthentication } from './OutOfBandAuthentication';
import type { OutOfBandPayload } from './OutOfBandPayload';
import { OutOfBandRegistration } from './OutOfBandRegistration';
import { OutOfBandOperationError } from '../../error/outOfBand/operation/OutOfBandOperationError';
import { HttpOperation, HttpOperationImpl } from '../HttpOperation';
/**
 * The operation managing an {@link OutOfBandPayload}.
 *
 * An {@link OutOfBandPayload} can be provided through different means:
 *   - a push notification,
 *   - a QR code or
 *   - an application link.
 *
 * This operation will process the payload, decrypt it if needed and send it to the server. If the
 * payload is successfully handled by the server, then the SDK will identify whether the operation
 * associated with the payload is a registration or an authentication. Depending on that the
 * {@link onRegistration} or the {@link onAuthentication} will be invoked.
 *
 * Usage example:
 * ```ts
 * [...]
 *   async authenticateUsingOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       payload: OutOfBandPayload
 *   ): Promise<void> {
 *       await client.operations.outOfBandOperation
 *           .payload(payload)
 *           .onRegistration((registration) => {
 *               // handle registration
 *           })
 *           .onAuthentication((authentication) => {
 *               // handle authentication
 *           })
 *           .onError((_error) => {
 *               // handle out-of-band error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * @see
 * - {@link OutOfBandPayload}
 * - {@link OutOfBandRegistration}
 * - {@link OutOfBandAuthentication}
 */
export declare abstract class OutOfBandOperation extends HttpOperation<OutOfBandOperation> {
    /**
     * Specifies the out-of-band payload to be handled.
     *
     * **IMPORTANT** \
     * Providing the out-of-band payload is required.
     *
     * @param payload the payload.
     * @returns an {@link OutOfBandOperation} object.
     */
    abstract payload(payload: OutOfBandPayload): OutOfBandOperation;
    /**
     * Specifies the object that will handle the {@link OutOfBandRegistration} object associated with
     * the out-of-band payload.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link onRegistration} or {@link onAuthentication} callbacks is
     * required.
     *
     * @param onRegistration the callback that will be invoked in case of registration.
     * @returns an {@link OutOfBandOperation} object.
     */
    abstract onRegistration(onRegistration: (registration: OutOfBandRegistration) => void): OutOfBandOperation;
    /**
     * Specifies the object that will handle the {@link OutOfBandAuthentication} object associated with
     * the out-of-band payload.
     *
     * **IMPORTANT** \
     * Providing at least one of the {@link onRegistration} or {@link onAuthentication} callbacks is
     * required.
     *
     * @param onAuthentication the callback that will be invoked in case of authentication.
     * @returns an {@link OutOfBandOperation} object.
     */
    abstract onAuthentication(onAuthentication: (authentication: OutOfBandAuthentication) => void): OutOfBandOperation;
    /**
     * Specifies the object that will be invoked if the {@link OutOfBandPayload} could not be decoded.
     *
     * **IMPORTANT** \
     * Providing the {@link onError} is required.
     *
     * @param onError the callback which receives an {@link OutOfBandPayloadError}.
     * @returns an {@link OutOfBandPayloadDecode} object.
     */
    abstract onError(onError: (error: OutOfBandOperationError) => void): OutOfBandOperation;
}
export declare class OutOfBandOperationImpl extends HttpOperationImpl<OutOfBandOperation> implements OutOfBandOperation {
    private _payload?;
    private _onRegistration?;
    private _onAuthentication?;
    private _onError?;
    payload(payload: OutOfBandPayload): OutOfBandOperation;
    onRegistration(onRegistration: (registration: OutOfBandRegistration) => void): OutOfBandOperation;
    onAuthentication(onAuthentication: (authentication: OutOfBandAuthentication) => void): OutOfBandOperation;
    onError(onError: (error: OutOfBandOperationError) => void): OutOfBandOperation;
    execute(): Promise<void>;
}
//# sourceMappingURL=OutOfBandOperation.d.ts.map