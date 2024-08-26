/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OperationIdMessage } from '../../model/messages/out/OperationIdMessage';
import { PinEnrollMessage } from '../../model/messages/out/PinEnrollMessage';
import { CancellableHandler } from '../CancellableHandler';

/**
 * The object handling the PIN to be enrolled.
 *
 * @see {@link PinEnroller.enrollPin}
 */
export abstract class PinEnrollmentHandler extends CancellableHandler {
	/**
	 * Specify the PIN to be enrolled.
	 *
	 * When this method is invoked, the SDK will validate the PIN and, if valid, will enroll it.
	 *
	 * @param pin the PIN.
	 */
	abstract pin(pin: string): Promise<void>;
}

export class PinEnrollmentHandlerImpl extends PinEnrollmentHandler {
	private readonly _operationId: string;

	constructor(operationId: string) {
		super();
		this._operationId = operationId;
	}

	async pin(pin: string): Promise<void> {
		const message = new PinEnrollMessage(this._operationId, pin);
		return NevisMobileAuthenticationSdkReact.pinEnroll(message);
	}

	async cancel(): Promise<void> {
		const message = new OperationIdMessage(this._operationId);
		return NevisMobileAuthenticationSdkReact.cancel(message);
	}
}
