/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { InitializationDeviceProtectionError } from './InitializationDeviceProtectionError';

/**
 * The device is rooted. The SDK cannot be run in rooted devices. For security reasons, the SDK will remove the
 * credentials in this device when this is detected.
 */
export class InitializationRootedError extends InitializationDeviceProtectionError {
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
