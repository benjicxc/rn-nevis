"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationNoDeviceLockError = void 0;
var _AuthenticationDeviceProtectionError = require("./AuthenticationDeviceProtectionError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The device has no secure lock screen.
 */
class AuthenticationNoDeviceLockError extends _AuthenticationDeviceProtectionError.AuthenticationDeviceProtectionError {
  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
   */
  constructor(description, cause, sessionProvider) {
    super(description, cause, sessionProvider);
  }
}
exports.AuthenticationNoDeviceLockError = AuthenticationNoDeviceLockError;
//# sourceMappingURL=AuthenticationNoDeviceLockError.js.map