/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { OutOfBandPlatformOperationType } from '../../../cache/operation/OutOfBandPlatformOperation';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the operation type native event.
 */
export declare class OperationTypeMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The type of the out-of-band operation.
     */
    operationType: OutOfBandPlatformOperationType;
    /**
     * Default constructor for {@link OperationTypeMessage}.
     *
     * @param operationId the identifier of operation.
     * @param operationType the type of the out-of-band operation.
     */
    private constructor();
    /**
     * Alternate constructor that creates an {@link OperationTypeMessage} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): OperationTypeMessage;
}
//# sourceMappingURL=OperationTypeMessage.d.ts.map