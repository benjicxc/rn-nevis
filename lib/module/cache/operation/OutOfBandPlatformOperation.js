/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PlatformOperation } from './PlatformOperation';

/**
 * Represents the eligible types of an out-of-band operation.
 */
export let OutOfBandPlatformOperationType = /*#__PURE__*/function (OutOfBandPlatformOperationType) {
  OutOfBandPlatformOperationType["registration"] = "REGISTRATION";
  OutOfBandPlatformOperationType["authentication"] = "AUTHENTICATION";
  return OutOfBandPlatformOperationType;
}({});

/**
 * Helps in following the states of out of band operations during method channel calls.
 */
export class OutOfBandPlatformOperation extends PlatformOperation {
  constructor(operationId, onOperationType) {
    super();
    this.operationId = operationId;
    this.onOperationType = onOperationType;
  }

  /**
   * Provides a way to update the current operation type.
   * When an out-of-band operation is started at first we cannot know whether it will be an
   * authentication or a registration operation. This information is provided once the native sdk
   * reaches either the authentication or the registration callback.
   *
   * @param type the new operation type.
   */
  updateOperationType(type) {
    var _this$onOperationType;
    (_this$onOperationType = this.onOperationType) === null || _this$onOperationType === void 0 || _this$onOperationType.call(this, type);
  }
}
//# sourceMappingURL=OutOfBandPlatformOperation.js.map