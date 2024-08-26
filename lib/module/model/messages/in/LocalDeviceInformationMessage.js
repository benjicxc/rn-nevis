/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { DeviceInformation } from '../../../localData/DeviceInformation';
import { ChannelMessage } from '../ChannelMessage';

/**
 * Holds the parameters of the local device information native event.
 */
export class LocalDeviceInformationMessage extends ChannelMessage {
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
    const deviceInformation = data && DeviceInformation.fromJson(data);
    return new LocalDeviceInformationMessage(operationId, deviceInformation);
  }
}
//# sourceMappingURL=LocalDeviceInformationMessage.js.map