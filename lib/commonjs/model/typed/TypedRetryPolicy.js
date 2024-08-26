"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypedRetryPolicy = exports.TypedNoRetryPolicy = exports.TypedExponentialRetryPolicy = exports.TypedConstantRetryPolicy = void 0;
var _TypedData = require("./TypedData");
var _RetryPolicy = require("../../operations/RetryPolicy");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class RetryPolicyData {
  constructor(maxRetries, delayInSeconds, initialDelayInSeconds, maximumDelayInSeconds, multiplier) {
    this.maxRetries = maxRetries;
    this.delayInSeconds = delayInSeconds;
    this.initialDelayInSeconds = initialDelayInSeconds;
    this.maximumDelayInSeconds = maximumDelayInSeconds;
    this.multiplier = multiplier;
  }
}
class TypedRetryPolicy extends _TypedData.TypedData {
  static create(retryPolicy) {
    if (retryPolicy instanceof _RetryPolicy.NoRetryPolicy) {
      return new TypedNoRetryPolicy();
    } else if (retryPolicy instanceof _RetryPolicy.ConstantRetryPolicy) {
      return new TypedConstantRetryPolicy(retryPolicy);
    } else if (retryPolicy instanceof _RetryPolicy.ExponentialRetryPolicy) {
      return new TypedExponentialRetryPolicy(retryPolicy);
    } else {
      throw new Error(`Unknown retry policy (${retryPolicy.constructor.name}).`);
    }
  }
}
exports.TypedRetryPolicy = TypedRetryPolicy;
class TypedNoRetryPolicy extends TypedRetryPolicy {
  type = 'NoRetryPolicy';
  constructor() {
    super();
    this.data = new RetryPolicyData();
  }
}
exports.TypedNoRetryPolicy = TypedNoRetryPolicy;
class TypedConstantRetryPolicy extends TypedRetryPolicy {
  type = 'ConstantRetryPolicy';
  constructor(wrapped) {
    super();
    this.data = new RetryPolicyData(wrapped.maxRetries, wrapped.delayInSeconds);
  }
}
exports.TypedConstantRetryPolicy = TypedConstantRetryPolicy;
class TypedExponentialRetryPolicy extends TypedRetryPolicy {
  type = 'ExponentialRetryPolicy';
  constructor(wrapped) {
    super();
    this.data = new RetryPolicyData(wrapped.maxRetries, undefined, wrapped.initialDelayInSeconds, wrapped.maximumDelayInSeconds, wrapped.multiplier);
  }
}
exports.TypedExponentialRetryPolicy = TypedExponentialRetryPolicy;
//# sourceMappingURL=TypedRetryPolicy.js.map