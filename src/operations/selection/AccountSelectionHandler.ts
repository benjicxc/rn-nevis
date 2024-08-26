/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { AccountUsernameMessage } from '../../model/messages/out/AccountUsernameMessage';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { CancellableHandler } from '../../operations/CancellableHandler';

/**
 * The objects consuming the outcome of an interaction where the user chooses the account to be used.
 *
 * @see {@link AccountSelector.selectAccount}
 */
export abstract class AccountSelectionHandler extends CancellableHandler {
	/**
	 * Provides the username of the account selected by the user.
	 *
	 * @param username the username of the selected account.
	 */
	abstract username(username: string): Promise<void>;
}

export class AccountSelectionHandlerImpl extends AccountSelectionHandler {
	operationId: string;

	constructor(operationId: string) {
		super();
		this.operationId = operationId;
	}

	async username(username: string): Promise<void> {
		const message = new AccountUsernameMessage(this.operationId, username);
		return NevisMobileAuthenticationSdkReact.accountUsername(message);
	}

	cancel(): Promise<void> {
		const message = new OperationIdMessage(this.operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
