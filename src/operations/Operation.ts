/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The generic interface representing an operation returned by {@link Operations}.
 */
export abstract class Operation {
	/**
	 * Executes the operation asynchronously.
	 */
	abstract execute(): Promise<void>;
}
