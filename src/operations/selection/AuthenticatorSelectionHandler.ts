/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { AuthenticatorAaidMessage } from '../../model/messages/out/AuthenticatorAaidMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The objects consuming the outcome of an interaction where the user chooses the authenticator to
 * be used.
 *
 * @see {@link AuthenticatorSelector.selectAuthenticator}
 */
export abstract class AuthenticatorSelectionHandler extends CancellableHandler {
	/**
	 * Provides the AAID of the authenticator selected by the user.
	 *
	 * @param aaid the AAID of the selected authenticator.
	 */
	abstract aaid(aaid: string): Promise<void>;
}

export class AuthenticatorSelectionHandlerImpl extends AuthenticatorSelectionHandler {
	private readonly _operationId: string;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
	}

	async aaid(aaid: string): Promise<void> {
		const message = new AuthenticatorAaidMessage(this._operationId, aaid);
		return NevisMobileAuthenticationSdkReact.authenticatorAaid(message);
	}

	async cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
