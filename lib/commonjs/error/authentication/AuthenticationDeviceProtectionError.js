"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationDeviceProtectionError = void 0;
var _AuthenticationError = require("./AuthenticationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An error that indicates that some form of tampering was found in the application.
 * Currently, this is always an {@link AuthenticationNoDeviceLockError}.
 */
class AuthenticationDeviceProtectionError extends _AuthenticationError.AuthenticationError {
  /**
   * Provides details about the error that occurred.
   */

  /**
   * The exception (if any) that caused this error.
   */

  /**
   * The {@link SessionProvider} that can be used to continue with the operation.
   */

  /**
   * The default constructor.
   *
   * @param description provides details about the error that occurred.
   * @param cause the exception (if any) that caused this error.
   * @param sessionProvider the {@link SessionProvider} that can be used to continue with the operation.
   */
  constructor(description, cause, sessionProvider) {
    super();
    this.description = description;
    this.cause = cause;
    this.sessionProvider = sessionProvider;
  }
}
exports.AuthenticationDeviceProtectionError = AuthenticationDeviceProtectionError;
//# sourceMappingURL=AuthenticationDeviceProtectionError.js.map