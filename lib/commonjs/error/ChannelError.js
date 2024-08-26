"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChannelError = void 0;
var _FidoErrorCodeConverter = require("./FidoErrorCodeConverter");
var _SessionProvider = require("../authorization/SessionProvider");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Represents the error that can occur during communicating with the native plugins.
 */
class ChannelError {
  /**
   * The type of the error (e.g. `DeviceProtectionError` or `FidoError`).
   */

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
   * The FIDO UAF error that occurred.
   *
   * @see {@link OperationFidoError}, {@link AuthCloudApiFidoError}, and {@link AuthenticationFidoError}.
   */

  /**
   * The message is provided by the operating system during fingerprint verification error.
   */

  /**
   * The default constructor.
   *
   * @param type The type of the error (e.g. `DeviceProtectionError` or `FidoError`).
   * @param description The exception (if any) that caused this error.
   * @param cause The exception (if any) that caused this error.
   * @param sessionProvider The {@link SessionProvider} that can be used to continue with the operation.
   * @param errorCode The FIDO UAF error that occurred.
   * @param message The message is provided by the operating system during fingerprint verification error.
   */
  constructor(type, description, cause, sessionProvider, errorCode, message) {
    this.type = type;
    this.description = description;
    this.cause = cause;
    this.sessionProvider = sessionProvider;
    this.errorCode = errorCode;
    this.message = message;
  }

  /**
   * Alternate constructor that creates a {@link ChannelError} from a json.
   *
   * @param input contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(input) {
    let root = input;
    if (input.userInfo && input.userInfo.exception) {
      root = input.userInfo.exception;
    }
    const type = root.type;
    const data = root.data;
    const sessionProvider = data.sessionProvider && _SessionProvider.SessionProvider.fromJson(data.sessionProvider);
    const errorCode = data.errorCode && _FidoErrorCodeConverter.FidoErrorCodeConverter.fromJson(data.errorCode);
    return new ChannelError(type, data.description, data.cause, sessionProvider, errorCode, data.message);
  }
}
exports.ChannelError = ChannelError;
//# sourceMappingURL=ChannelError.js.map