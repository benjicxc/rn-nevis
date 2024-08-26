/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OperationMessage } from './OperationMessage';
import type { Configuration } from '../../../Configuration';
/**
 * Holds the parameters of the client initialization operation call.
 */
export declare class InitClientMessage extends OperationMessage {
    /**
     * The identifier of the operation.
     */
    operationId: string;
    /**
     * Flag that tells whether the success callback is provided.
     */
    onSuccessProvided: boolean;
    /**
     * Flag that tells whether the error callback is provided.
     */
    onErrorProvided: boolean;
    /**
     * The sdk configuration.
     */
    configuration?: Configuration;
    /**
     * Creates a new instance.
     *
     * @param operationId the identifier of the operation.
     * @param onSuccessProvided flag that tells whether the success callback is provided.
     * @param onErrorProvided flag that tells whether the error callback is provided.
     * @param configuration the sdk configuration.
     */
    constructor(operationId: string, onSuccessProvided: boolean, onErrorProvided: boolean, configuration?: Configuration);
}
//# sourceMappingURL=InitClientMessage.d.ts.map