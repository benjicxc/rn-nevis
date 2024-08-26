/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The interface that operation or user interaction handlers are derived from.
 */
export abstract class CancellableHandler {
	/**
	 * This method should be invoked if the operation must be canceled.
	 */
	abstract cancel(): Promise<void>;
}
