"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinPolicyProvider = void 0;
var _PinPolicy = require("./PinPolicy");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An object defining the {@link PinPolicy}.
 */
class PinPolicyProvider {
  /**
   * The object defining the minimum and maximum length of the PIN.
   *
   * If not implemented, it will return a PIN policy with a minimum and maximum length of 6 digits.
   */
  pinPolicy = _PinPolicy.PinPolicy.create(6, 6);
}
exports.PinPolicyProvider = PinPolicyProvider;
//# sourceMappingURL=PinPolicyProvider.js.map