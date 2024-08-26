"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationUnknownError = void 0;
var _AuthenticationError = require("./AuthenticationError");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Unknown operation error, handling not categorized error cases.
 */
class AuthenticationUnknownError extends _AuthenticationError.AuthenticationError {
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
exports.AuthenticationUnknownError = AuthenticationUnknownError;
//# sourceMappingURL=AuthenticationUnknownError.js.map