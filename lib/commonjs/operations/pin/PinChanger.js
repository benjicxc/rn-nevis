"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinChanger = void 0;
var _PinPolicyProvider = require("./PinPolicyProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The object in charge of PIN change.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see {@link PinChange.pinChanger}
 */
class PinChanger extends _PinPolicyProvider.PinPolicyProvider {}
exports.PinChanger = PinChanger;
//# sourceMappingURL=PinChanger.js.map