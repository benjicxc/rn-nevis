/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the PIN verification call.
 */
export class PinVerificationMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The PIN parameter of the call.
   */

  /**
   * Default constructor for {@VerifyPinMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param pin the PIN parameter of the call.
   */
  constructor(operationId, pin) {
    super();
    this.operationId = operationId;
    this.pin = pin;
  }
}
//# sourceMappingURL=PinVerificationMessage.js.map