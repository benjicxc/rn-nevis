/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import { ConstantRetryPolicy, ExponentialRetryPolicy, NoRetryPolicy } from '../../operations/RetryPolicy';
class RetryPolicyData {
  constructor(maxRetries, delayInSeconds, initialDelayInSeconds, maximumDelayInSeconds, multiplier) {
    this.maxRetries = maxRetries;
    this.delayInSeconds = delayInSeconds;
    this.initialDelayInSeconds = initialDelayInSeconds;
    this.maximumDelayInSeconds = maximumDelayInSeconds;
    this.multiplier = multiplier;
  }
}
export class TypedRetryPolicy extends TypedData {
  static create(retryPolicy) {
    if (retryPolicy instanceof NoRetryPolicy) {
      return new TypedNoRetryPolicy();
    } else if (retryPolicy instanceof ConstantRetryPolicy) {
      return new TypedConstantRetryPolicy(retryPolicy);
    } else if (retryPolicy instanceof ExponentialRetryPolicy) {
      return new TypedExponentialRetryPolicy(retryPolicy);
    } else {
      throw new Error(`Unknown retry policy (${retryPolicy.constructor.name}).`);
    }
  }
}
export class TypedNoRetryPolicy extends TypedRetryPolicy {
  type = 'NoRetryPolicy';
  constructor() {
    super();
    this.data = new RetryPolicyData();
  }
}
export class TypedConstantRetryPolicy extends TypedRetryPolicy {
  type = 'ConstantRetryPolicy';
  constructor(wrapped) {
    super();
    this.data = new RetryPolicyData(wrapped.maxRetries, wrapped.delayInSeconds);
  }
}
export class TypedExponentialRetryPolicy extends TypedRetryPolicy {
  type = 'ExponentialRetryPolicy';
  constructor(wrapped) {
    super();
    this.data = new RetryPolicyData(wrapped.maxRetries, undefined, wrapped.initialDelayInSeconds, wrapped.maximumDelayInSeconds, wrapped.multiplier);
  }
}
//# sourceMappingURL=TypedRetryPolicy.js.map