/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';

/**
 * An object that can be used to resume listening for OS credentials (i.e. fingerprint, face recognition)
 * and to cancel the whole operation while listening for credentials.
 *
 * This is used with {@link Aaid.BIOMETRIC}, {@link Aaid.DEVICE_PASSCODE} and {@link Aaid.FINGERPRINT}
 * authenticator attestation identifier.
 *
 * @see
 * - {@link BiometricUserVerificationHandler.listenForOsCredentials}
 * - {@link FingerprintUserVerificationHandler.listenForOsCredentials}
 */
export abstract class OsAuthenticationListenHandler {
	/**
	 * Cancels the authentication operation.
	 *
	 *  This will result in the operation being cancelled and a {@link FidoErrorCodeType.UserCanceled}
	 *  will be passed to the registration or authentication service delegates.
	 */
	abstract cancelAuthentication(): Promise<void>;

	/**
	 * Pauses listening for OS credentials.
	 *
	 * If the application is listening for OS credentials, and it is brought to the background, then
	 * the operating system will cancel automatically listening for credentials and will send an error.
	 * This method must be invoked when the application is brought to the background for the SDK not
	 * to send an error.
	 *
	 * Invoking this method will have effect only if {@link cancelAuthentication} was not previously
	 * invoked.
	 *
	 * @returns the {@link OsAuthenticationListenHandler} to handle the new listening.
	 */
	abstract pauseListening(): Promise<OsAuthenticationListenHandler>;

	/**
	 * Resumes listening for OS credentials.
	 *
	 * If the application is listening for OS credentials and it is brought to the background, then
	 * the operating system will cancel automatically listening for credentials.
	 * This method must be invoked when the application is brought to the foreground again to resume
	 * listening for credentials.
	 *
	 * Invoking this method will have effect only if {@link cancelAuthentication} was not previously
	 * invoked.
	 *
	 * Note: invoking this method after {@link FingerprintUserVerificationHandler.listenForOsCredentials}
	 * or invoking this method sequentially without the application being sent to the background might
	 * result in recoverable errors being returned (see {@link FingerprintUserVerificationContext.lastRecoverableError})
	 * depending on the fingerprint hardware used. That is why this method should only be invoked
	 * after the application is brought back from background.
	 *
	 * @returns the {@link OsAuthenticationListenHandler} to handle the new listening.
	 */
	abstract resumeListening(): Promise<OsAuthenticationListenHandler>;
}

export class OsAuthenticationListenHandlerImpl extends OsAuthenticationListenHandler {
	private readonly _operationId: string;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
	}

	async cancelAuthentication(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancelAuthentication(message);
	}

	async pauseListening(): Promise<OsAuthenticationListenHandler> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.pauseListening(message).then(() => {
			return this;
		});
	}

	async resumeListening(): Promise<OsAuthenticationListenHandler> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.resumeListening(message).then(() => {
			return this;
		});
	}
}
