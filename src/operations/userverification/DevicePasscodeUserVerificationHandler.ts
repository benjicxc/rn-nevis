/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import type { DevicePasscodePromptOptions } from './DevicePasscodePromptOptions';
import {
	type OsAuthenticationListenHandler,
	OsAuthenticationListenHandlerImpl,
} from './OsAuthenticationListenHandler';
import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { ListenForOsCredentialsMessage } from '../../model/messages/out/ListenForOsCredentialsMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { TypedDevicePasscodePromptOptions } from '../../model/typed/TypedPromptOptions';

/**
 *
 * The objects consuming the outcome of an interaction where the user provides device passcode credentials.
 *
 * This is used with the {@link Aaid.DEVICE_PASSCODE} authenticator attestation identifier. The particularity
 * of this authenticator with the other authenticators, is that the SDK relies on the operating system
 * prompt to authentication (i.e. there is no need to develop a GUI to do the authentication when
 * this authenticator is used).
 *
 * @see {@link DevicePasscodeUserVerifier.verifyDevicePasscode}
 */
export abstract class DevicePasscodeUserVerificationHandler extends UserVerificationHandler {
	/**
	 * When this method is invoked, the SDK will invoke the operating system prompt to ask the user
	 * to provide credentials.
	 *
	 * So no GUI must be explicitly defined by the code using the SDK (as required in the fingerprint
	 * and the PIN authenticators).
	 *
	 * @param devicePasscodePromptOptions the options to be used when prompting.
	 * @returns an {@link OsAuthenticationListenHandler} that can be used to cancel listening for OS
	 * credentials.
	 */
	abstract listenForOsCredentials(
		devicePasscodePromptOptions?: DevicePasscodePromptOptions
	): Promise<OsAuthenticationListenHandler>;
}

export class DevicePasscodeUserVerificationHandlerImpl extends DevicePasscodeUserVerificationHandler {
	private readonly _operationId: string;
	private readonly _listenForOsCredentials: OsAuthenticationListenHandler;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
		this._listenForOsCredentials = new OsAuthenticationListenHandlerImpl(operationId);
	}

	async listenForOsCredentials(
		devicePasscodePromptOptions?: DevicePasscodePromptOptions
	): Promise<OsAuthenticationListenHandler> {
		const typedDevicePasscodePromptOptions = new TypedDevicePasscodePromptOptions(
			devicePasscodePromptOptions
		);
		const message = new ListenForOsCredentialsMessage(
			this._operationId,
			typedDevicePasscodePromptOptions
		);
		return NevisMobileAuthenticationSdkReact.listenForOsCredentials(message).then(() => {
			return this._listenForOsCredentials;
		});
	}

	async cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
