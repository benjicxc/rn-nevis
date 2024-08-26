/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Authenticator } from '../../../localData/Authenticator';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the valid credentials provided native event.
 */
export class OnValidCredentialsProvidedMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The authenticator.
   */

  /**
   * Default constructor for {@link OnValidCredentialsProvidedMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param authenticator the authenticator.
   */
  constructor(operationId, authenticator) {
    super();
    this.operationId = operationId;
    this.authenticator = authenticator;
  }

  /**
   * Alternate constructor that creates an {@link OnValidCredentialsProvidedMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const authenticator = Authenticator.fromJson(json.authenticator);
    return new OnValidCredentialsProvidedMessage(operationId, authenticator);
  }
}
//# sourceMappingURL=OnValidCredentialsProvidedMessage.js.map