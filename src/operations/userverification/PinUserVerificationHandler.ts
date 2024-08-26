/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { UserVerificationHandler } from './UserVerificationHandler';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinVerificationMessage } from '../../model/messages/out/PinVerificationMessage';

/**
 * The objects consuming the outcome of an interaction where the user provides
 * PIN credentials.
 *
 * This is used with the {@link Aaid.PIN} authenticator attestation identifier.
 *
 * @see {@link PinUserVerifier.verifyPin}
 */
export abstract class PinUserVerificationHandler extends UserVerificationHandler {
	/**
	 * The method to be invoked when the PIN authenticator must be used.
	 *
	 * The SDK will verify that the provided PIN is valid.
	 * @param pin the PIN.
	 */
	abstract verifyPin(pin: string): Promise<void>;
}

export class PinUserVerificationHandlerImpl extends PinUserVerificationHandler {
	private readonly _operationId: string;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
	}

	async verifyPin(pin: string): Promise<void> {
		const message = new PinVerificationMessage(this._operationId, pin);
		return NevisMobileAuthenticationSdkReact.pinVerify(message);
	}

	async cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
