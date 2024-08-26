/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { DeviceInformation } from '../../../localData/DeviceInformation';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the local device information native event.
 */
export declare class LocalDeviceInformationMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The device information.
     */
    deviceInformation?: DeviceInformation;
    /**
     * Default constructor for {@link LocalDeviceInformationMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param deviceInformation the device information.
     */
    private constructor();
    /**
     * Alternate constructor that creates a {@link LocalDeviceInformationMessage} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): LocalDeviceInformationMessage;
}
//# sourceMappingURL=LocalDeviceInformationMessage.d.ts.map