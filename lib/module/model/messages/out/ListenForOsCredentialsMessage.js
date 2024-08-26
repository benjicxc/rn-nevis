/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the listening of OS credentials call.
 */
export class ListenForOsCredentialsMessage extends ChannelMessage {
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
//# sourceMappingURL=ListenForOsCredentialsMessage.js.map