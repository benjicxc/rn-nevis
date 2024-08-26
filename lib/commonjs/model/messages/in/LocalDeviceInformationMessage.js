"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalDeviceInformationMessage = void 0;
var _DeviceInformation = require("../../../localData/DeviceInformation");
var _ChannelMessage = require("../ChannelMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Holds the parameters of the local device information native event.
 */
class LocalDeviceInformationMessage extends _ChannelMessage.ChannelMessage {
  /**
   * The identifier of the operation.
   */

  /**
   * The device information.
   */

  /**
   * Default constructor for {@link LocalDeviceInformationMessage}.
   *
   * @param operationId the identifier of the operation.
   * @param deviceInformation the device information.
   */
  constructor(operationId, deviceInformation) {
    super();
    this.operationId = operationId;
    this.deviceInformation = deviceInformation;
  }

  /**
   * Alternate constructor that creates a {@link LocalDeviceInformationMessage} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns the created instance.
   */
  static fromJson(json) {
    const operationId = json.operationId;
    const data = json.deviceInformation;
    const deviceInformation = data && _DeviceInformation.DeviceInformation.fromJson(data);
    return new LocalDeviceInformationMessage(operationId, deviceInformation);
  }
}
exports.LocalDeviceInformationMessage = LocalDeviceInformationMessage;
//# sourceMappingURL=LocalDeviceInformationMessage.js.map