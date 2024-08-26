"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinEnroller = void 0;
var _PinPolicyProvider = require("./PinPolicyProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object in charge of PIN enrollment.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see
 * - {@link Registration.pinEnroller}
 * - {@link AuthCloudApiRegistration.pinEnroller}
 * - {@link OutOfBandRegistration.pinEnroller}
 */
class PinEnroller extends _PinPolicyProvider.PinPolicyProvider {}
exports.PinEnroller = PinEnroller;
//# sourceMappingURL=PinEnroller.js.map