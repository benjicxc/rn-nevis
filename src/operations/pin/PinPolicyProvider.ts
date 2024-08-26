/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PinPolicy } from './PinPolicy';

/**
 * An object defining the {@link PinPolicy}.
 */
export abstract class PinPolicyProvider {
	/**
	 * The object defining the minimum and maximum length of the PIN.
	 *
	 * If not implemented, it will return a PIN policy with a minimum and maximum length of 6 digits.
	 */
	pinPolicy: PinPolicy = PinPolicy.create(6, 6);
}
