/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthorizationProvider } from '../../../authorization/AuthorizationProvider';
import { OutOfBandPayload } from '../../../operations/outOfBand/OutOfBandPayload';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the success native event.
 */
export declare class OnSuccessMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The object providing authorization.
     */
    authorizationProvider?: AuthorizationProvider;
    /**
     * The out-of-band payload.
     */
    outOfBandPayload?: OutOfBandPayload;
    /**
     * Default constructor for {@link OnSuccessMessage}.
     *
     * @param operationId the identifier of operation.
     * @param authorizationProvider the object providing authorization.
     * @param outOfBandPayload the out-of-band payload.
     */
    constructor(operationId: string, authorizationProvider?: AuthorizationProvider, outOfBandPayload?: OutOfBandPayload);
    /**
     * Alternate constructor that creates an {@link OnSuccessMessage} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): OnSuccessMessage;
}
//# sourceMappingURL=OnSuccessMessage.d.ts.map