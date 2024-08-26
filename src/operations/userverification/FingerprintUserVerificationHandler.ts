/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import {
	type OsAuthenticationListenHandler,
	OsAuthenticationListenHandlerImpl,
} from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { ListenForOsCredentialsMessage } from '../../model/messages/out/ListenForOsCredentialsMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';

/**
 * The objects consuming the outcome of an interaction where the user provides fingerprint credentials.
 *
 * This is used with the {@link Aaid.FINGERPRINT} authenticator attestation identifier.
 *
 * @see {@link FingerprintUserVerifier.verifyFingerprint}
 */
export abstract class FingerprintUserVerificationHandler extends UserVerificationHandler {
	/**
	 * When this method is invoked, the SDK will wait for the user to provide credentials.
	 *
	 * If the credentials are provided, it will be checked that they are valid.
	 *
	 * Before invoking this method, some user interface should be presented to the end user asking
	 * to provide OS credentials (in the case of fingerprint, the user should be asked to place
	 * finger in the sensor to authenticate).
	 *
	 * @returns an {@link OsAuthenticationListenHandler} that can be used to cancel listening for OS
	 * credentials.
	 */
	abstract listenForOsCredentials(): Promise<OsAuthenticationListenHandler>;
}

export class FingerprintUserVerificationHandlerImpl extends FingerprintUserVerificationHandler {
	private readonly _operationId: string;
	private readonly _listenForOsCredentials: OsAuthenticationListenHandler;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
		this._listenForOsCredentials = new OsAuthenticationListenHandlerImpl(operationId);
	}

	async listenForOsCredentials(): Promise<OsAuthenticationListenHandler> {
		const message = new ListenForOsCredentialsMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.listenForOsCredentials(message).then(() => {
			return this._listenForOsCredentials;
		});
	}

	async cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
