/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the policy compliant native event.
 */
export declare class IsPolicyCompliantInMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * True if the {@link Authenticator} is compliant with the policy of the server.
     */
    isPolicyCompliant: boolean;
    /**
     * Default constructor for {@link IsPolicyCompliantInMessage}.
     *
     * @param operationId the identifier of the operation.
     * @param isPolicyCompliant true if the {@link Authenticator} is compliant with the policy of the server.
     */
    constructor(operationId: string, isPolicyCompliant: boolean);
}
//# sourceMappingURL=IsPolicyCompliantInMessage.d.ts.map