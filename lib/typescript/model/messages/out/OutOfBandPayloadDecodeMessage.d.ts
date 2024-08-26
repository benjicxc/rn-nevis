/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OperationMessage } from './OperationMessage';
/**
 * Holds the parameters of the out-of-band payload decode operation call.
 */
export declare class OutOfBandPayloadDecodeMessage extends OperationMessage {
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
     * Specifies the JSON to be decoded.
     */
    json?: string;
    /**
     * Specifies the JSON as Base64 URL encoded string to be decoded.
     */
    base64UrlEncoded?: string;
    /**
     * Creates a new instance.
     *
     * @param operationId the identifier of the operation.
     * @param onSuccessProvided flag that tells whether the success callback is provided.
     * @param onErrorProvided flag that tells whether the error callback is provided.
     * @param json the JSON to be decoded.
     * @param base64UrlEncoded the JSON as Base64 URL encoded string to be decoded.
     */
    constructor(operationId: string, onSuccessProvided: boolean, onErrorProvided: boolean, json?: string, base64UrlEncoded?: string);
}
//# sourceMappingURL=OutOfBandPayloadDecodeMessage.d.ts.map