"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationRootedError = void 0;
var _InitializationDeviceProtectionError = require("./InitializationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device is rooted. The SDK cannot be run in rooted devices. For security reasons, the SDK will remove the
 * credentials in this device when this is detected.
 */
class InitializationRootedError extends _InitializationDeviceProtectionError.InitializationDeviceProtectionError {
  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   */
  constructor(description, cause) {
    super(description, cause);
  }
}
exports.InitializationRootedError = InitializationRootedError;
//# sourceMappingURL=InitializationRootedError.js.map