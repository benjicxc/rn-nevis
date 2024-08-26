/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Helps in following the states of started operations during method channel
 * calls.
 *
 * An operation can be stored within {@link PlatformOperationCache}.
 */
export abstract class PlatformOperation {
	/**
	 * The id of the started operation.
	 *
	 * The operationId is transported through the method channel calls to follow
	 * which calls belong to the same operation.
	 */
	abstract operationId: string;
}
