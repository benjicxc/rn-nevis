/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OutOfBandOperationDeviceProtectionError } from './OutOfBandOperationDeviceProtectionError';

/**
 * The device has no secure lock screen.
 */
export class OutOfBandOperationNoDeviceLockError extends OutOfBandOperationDeviceProtectionError {
	/**
	 * The default constructor.
	 *
	 * @param description provides details about the error that occurred.
	 * @param cause the exception (if any) that caused this error.
	 */
	constructor(description: string, cause?: string) {
		super(description, cause);
	}
}
