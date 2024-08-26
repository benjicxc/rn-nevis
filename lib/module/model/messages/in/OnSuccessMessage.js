/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthorizationProvider } from '../../../authorization/AuthorizationProvider';
import { OutOfBandPayload } from '../../../operations/outOfBand/OutOfBandPayload';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the success native event.
 */
export class OnSuccessMessage extends ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The object providing authorization.
   */

  /**
   * The out-of-band payload.
   */

  /**
   * Default constructor for {@link OnSuccessMessage}.
   *
   * @param operationId the identifier of operation.
   * @param authorizationProvider the object providing authorization.
   * @param outOfBandPayload the out-of-band payload.
   */
  constructor(operationId, authorizationProvider, outOfBandPayload) {
    super();
    this.operationId = operationId;
    this.authorizationProvider = authorizationProvider;
    this.outOfBandPayload = outOfBandPayload;
  }

  /**
   * Alternate constructor that creates an {@link OnSuccessMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    let provider;
    if (json.authorizationProvider) {
      provider = AuthorizationProvider.fromJson(json.authorizationProvider);
    }
    let payload;
    if (json.outOfBandPayload) {
      payload = OutOfBandPayload.fromJson(json.outOfBandPayload);
    }
    return new OnSuccessMessage(json.operationId, provider, payload);
  }
}
//# sourceMappingURL=OnSuccessMessage.js.map