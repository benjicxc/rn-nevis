"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinPolicyImpl = exports.PinPolicy = void 0;
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object defining the minimum and maximum length of the PIN.
 */
class PinPolicy {
  /**
   * The minimum length of the PIN.
   */

  /**
   * The maximum length of the PIN.
   */

  /**
   * Default constructor for {@link PinPolicy}.
   *
   * @param minLength the minimum length of the PIN.
   * @param maxLength the maximum length of the PIN.
   * @returns an {@link PinPolicy} instance.
   */
  static create(minLength, maxLength) {
    return new PinPolicyImpl(minLength, maxLength);
  }

  /**
   * Alternate constructor that creates an instance from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    return PinPolicyImpl.fromJson(json);
  }
}
exports.PinPolicy = PinPolicy;
class PinPolicyImpl extends PinPolicy {
  constructor(minLength, maxLength) {
    super();
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
  static fromJson(json) {
    return new PinPolicyImpl(json.minLength, json.maxLength);
  }
}
exports.PinPolicyImpl = PinPolicyImpl;
//# sourceMappingURL=PinPolicy.js.map