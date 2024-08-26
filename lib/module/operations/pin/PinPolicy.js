/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object defining the minimum and maximum length of the PIN.
 */
export class PinPolicy {
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
export class PinPolicyImpl extends PinPolicy {
  constructor(minLength, maxLength) {
    super();
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
  static fromJson(json) {
    return new PinPolicyImpl(json.minLength, json.maxLength);
  }
}
//# sourceMappingURL=PinPolicy.js.map