"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListenForOsCredentialsMessage = void 0;
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the listening of OS credentials call.
 */
class ListenForOsCredentialsMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The prompt options to be used in case of biometric or device passcode authenticator.
   * This object could be either a {@link BiometricPromptOptions} or a {@link DevicePasscodePromptOptions}.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param promptOptions the prompt options to be used in case of biometric or device passcode authenticator.
   */
  constructor(operationId, promptOptions) {
    super();
    this.operationId = operationId;
    this.promptOptions = promptOptions;
  }
}
exports.ListenForOsCredentialsMessage = ListenForOsCredentialsMessage;
//# sourceMappingURL=ListenForOsCredentialsMessage.js.map