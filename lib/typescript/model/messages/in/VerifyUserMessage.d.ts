/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { UserVerificationContext } from '../../../operations/userverification/UserVerificationContext';
import { ChannelMessage } from '../ChannelMessage';
/**
 * Holds the parameters of the verify user native event.
 */
export declare class VerifyUserMessage extends ChannelMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * The user verification context.
     */
    context: UserVerificationContext;
    /**
     * Default constructor for {@link VerifyUserMessage}.
     *
     * @param operationId the identifier of operation.
     * @param context the user verification context.
     */
    private constructor();
    /**
     * Alternate constructor that creates a {@link VerifyUserMessage} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns the created instance.
     */
    static fromJson(json: any): VerifyUserMessage;
}
//# sourceMappingURL=VerifyUserMessage.d.ts.map