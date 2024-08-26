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
export class RetryPolicy {}

/**
 * Retry policy to do not retry: in case of failure the operation will report
 *  the error without retrying.
 */
export class NoRetryPolicy extends RetryPolicy {
  /**
   * Default constructor for {@link NoRetryPolicy}.
   *
   * @returns the created {@link NoRetryPolicy} instance.
   */
  static create() {
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
export class ConstantRetryPolicy extends RetryPolicy {
  /**
   * The maximum number of retries.
   */

  /**
   * The time interval between retries in seconds.
   */

  /**
   * Default constructor for {@link ConstantRetryPolicy}.
   *
   * @param maxRetries the maximum number of retries.
   * @param delayInSeconds the time interval between retries in seconds.
   * @returns the created {@link ConstantRetryPolicy} instance.
   */
  static create(maxRetries, delayInSeconds) {
    return new ConstantRetryPolicyImpl(maxRetries, delayInSeconds);
  }
}
export class ConstantRetryPolicyImpl extends ConstantRetryPolicy {
  constructor(maxRetries, delayInSeconds) {
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
export class ExponentialRetryPolicy extends RetryPolicy {
  /**
   * The maximum number of retries.
   */

  /**
   * The delay to be waited before executing the first retry.
   */

  /**
   * The multiplier of the delay interval.
   */

  /**
   * The maximum time interval of the delay in seconds.
   */

  /**
   * Default constructor for {@link ExponentialRetryPolicy}.
   *
   * @param maxRetries the maximum number of retries.
   * @param initialDelayInSeconds the delay to be waited before executing the forst retry.
   * @param maximumDelayInSeconds the multiplier of the delay interval.
   * @param multiplier the maximum time interval of the delay in seconds.
   * @returns the created {@link ExponentialRetryPolicy} instance.
   */
  static create(maxRetries, initialDelayInSeconds, maximumDelayInSeconds, multiplier) {
    return new ExponentialRetryPolicyImpl(maxRetries, initialDelayInSeconds, maximumDelayInSeconds, multiplier);
  }
}
export class ExponentialRetryPolicyImpl extends ExponentialRetryPolicy {
  constructor(maxRetries, initialDelayInSeconds, maximumDelayInSeconds, multiplier) {
    super();
    this.initialDelayInSeconds = initialDelayInSeconds;
    this.maxRetries = maxRetries;
    this.maximumDelayInSeconds = maximumDelayInSeconds;
    this.multiplier = multiplier;
  }
}
//# sourceMappingURL=RetryPolicy.js.map