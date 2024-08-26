/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinsChangeMessage } from '../../model/messages/out/PinsChangeMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The object handling the old and new PIN provided by the end-user.
 *
 * @see {@link PinChanger.changePin}
 */
export abstract class PinChangeHandler extends CancellableHandler {
	/**
	 * Specify the old PIN and the new PIN.
	 *
	 * To change a PIN, the SDK requires to provide the old PIN.
	 * When this method is invoked, the SDK will validate the provided PINs.
	 *
	 * @param oldPin the old PIN.
	 * @param newPin the new PIN.
	 */
	abstract pins(oldPin: string, newPin: string): Promise<void>;
}

export class PinChangeHandlerImpl extends PinChangeHandler {
	private readonly _operationId: string;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
	}

	async pins(oldPin: string, newPin: string): Promise<void> {
		const message = new PinsChangeMessage(this._operationId, oldPin, newPin);
		return NevisMobileAuthenticationSdkReact.pinsChange(message);
	}

	cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
