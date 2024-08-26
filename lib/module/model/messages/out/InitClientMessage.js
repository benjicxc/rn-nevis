/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { OperationMessage } from './OperationMessage';
/**
 * Holds the parameters of the client initialization operation call.
 */
export class InitClientMessage extends OperationMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * Flag that tells whether the success callback is provided.
   */

  /**
   * Flag that tells whether the error callback is provided.
   */

  /**
   * The sdk configuration.
   */

  /**
   * Creates a new instance.
   *
   * @param operationId the identifier of the operation.
   * @param onSuccessProvided flag that tells whether the success callback is provided.
   * @param onErrorProvided flag that tells whether the error callback is provided.
   * @param configuration the sdk configuration.
   */
  constructor(operationId, onSuccessProvided, onErrorProvided, configuration) {
    super();
    this.operationId = operationId;
    this.onSuccessProvided = onSuccessProvided;
    this.onErrorProvided = onErrorProvided;
    this.configuration = configuration;
  }
}
//# sourceMappingURL=InitClientMessage.js.map