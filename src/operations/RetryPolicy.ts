/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Some of the operations of the SDK allow to retry the operation (or part of the operation).
 * This object defines the different types of retry mode that can be used.
 *
 * @see
 * - {@link Authentication.retryPolicyObtainingAuthorizationProvider}
 * - {@link DeviceInformationChange.retryPolicy}
 */
export abstract class RetryPolicy {}

/**
 * Retry policy to do not retry: in case of failure the operation will report
 *  the error without retrying.
 */
export abstract class NoRetryPolicy extends RetryPolicy {
	/**
	 * Default constructor for {@link NoRetryPolicy}.
	 *
	 * @returns the created {@link NoRetryPolicy} instance.
	 */
	static create(): NoRetryPolicy {
		return new NoRetryPolicyImpl();
	}
}

export class NoRetryPolicyImpl extends NoRetryPolicy {
	constructor() {
		super();
	}
}

/**
 * The operation will be retried periodically with a maximum number of tries.
 */
export abstract class ConstantRetryPolicy extends RetryPolicy {
	/**
	 * The maximum number of retries.
	 */
	abstract maxRetries: number;

	/**
	 * The time interval between retries in seconds.
	 */
	abstract delayInSeconds: number;

	/**
	 * Default constructor for {@link ConstantRetryPolicy}.
	 *
	 * @param maxRetries the maximum number of retries.
	 * @param delayInSeconds the time interval between retries in seconds.
	 * @returns the created {@link ConstantRetryPolicy} instance.
	 */
	static create(maxRetries: number, delayInSeconds: number): ConstantRetryPolicy {
		return new ConstantRetryPolicyImpl(maxRetries, delayInSeconds);
	}
}

export class ConstantRetryPolicyImpl extends ConstantRetryPolicy {
	maxRetries: number;
	delayInSeconds: number;

	constructor(maxRetries: number, delayInSeconds: number) {
		super();
		this.maxRetries = maxRetries;
		this.delayInSeconds = delayInSeconds;
	}
}

/**
 * The operation will be retried at exponential intervals.
 *
 * The delay will be incremented by multiplier after each iteration
 * (multiplier = 0.5 means 50% increment).
 */
export abstract class ExponentialRetryPolicy extends RetryPolicy {
	/**
	 * The maximum number of retries.
	 */
	abstract maxRetries: number;

	/**
	 * The delay to be waited before executing the first retry.
	 */
	abstract initialDelayInSeconds: number;

	/**
	 * The multiplier of the delay interval.
	 */
	abstract multiplier: number;

	/**
	 * The maximum time interval of the delay in seconds.
	 */
	abstract maximumDelayInSeconds: number;

	/**
	 * Default constructor for {@link ExponentialRetryPolicy}.
	 *
	 * @param maxRetries the maximum number of retries.
	 * @param initialDelayInSeconds the delay to be waited before executing the forst retry.
	 * @param maximumDelayInSeconds the multiplier of the delay interval.
	 * @param multiplier the maximum time interval of the delay in seconds.
	 * @returns the created {@link ExponentialRetryPolicy} instance.
	 */
	static create(
		maxRetries: number,
		initialDelayInSeconds: number,
		maximumDelayInSeconds: number,
		multiplier: number
	): ExponentialRetryPolicy {
		return new ExponentialRetryPolicyImpl(
			maxRetries,
			initialDelayInSeconds,
			maximumDelayInSeconds,
			multiplier
		);
	}
}

export class ExponentialRetryPolicyImpl extends ExponentialRetryPolicy {
	maxRetries: number;
	initialDelayInSeconds: number;
	maximumDelayInSeconds: number;
	multiplier: number;

	constructor(
		maxRetries: number,
		initialDelayInSeconds: number,
		maximumDelayInSeconds: number,
		multiplier: number
	) {
		super();
		this.initialDelayInSeconds = initialDelayInSeconds;
		this.maxRetries = maxRetries;
		this.maximumDelayInSeconds = maximumDelayInSeconds;
		this.multiplier = multiplier;
	}
}
