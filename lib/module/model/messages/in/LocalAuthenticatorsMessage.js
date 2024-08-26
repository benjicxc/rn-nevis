/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Authenticator } from '../../../localData/Authenticator';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the local authenticators native event.
 */
export class LocalAuthenticatorsMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The list of the registered authenticators.
   */

  /**
   * Default constructor for {@link LocalAuthenticatorsMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param authenticators the list of the registered authenticators.
   */
  constructor(operationId, authenticators) {
    super();
    this.operationId = operationId;
    this.authenticators = authenticators;
  }

  /**
   * Alternate constructor that creates a {@link LocalAuthenticatorsMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const data = json.authenticators;
    const authenticators = data.map(authenticator => Authenticator.fromJson(authenticator));
    return new LocalAuthenticatorsMessage(operationId, authenticators);
  }
}
//# sourceMappingURL=LocalAuthenticatorsMessage.js.map