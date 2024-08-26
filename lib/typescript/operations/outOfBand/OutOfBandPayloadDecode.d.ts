/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { OutOfBandPayload } from './OutOfBandPayload';
import type { OutOfBandPayloadError } from '../../error/outOfBand/payload/OutOfBandPayloadError';
import { Operation } from '../Operation';
/**
 * The object that decodes an {@link OutOfBandPayload} from a string in JSON format or a Base64 URL
 * encoded string representing the JSON.
 *
 * The {@link OutOfBandPayload} can be used to trigger an out-of-band operation (see {@link OutOfBandOperation}).
 *
 * Usage example:
 * ```ts
 * [...]
 *   async decodeOutOfBandPayload(
 *       client: MobileAuthenticationClient,
 *       json: string
 *   ): Promise<void> {
 *       await client.operations.outOfBandPayloadDecode
 *           .json(json)
 *           .onSuccess((outOfBandPayload) => {
 *               // handle the OutOfBandPayload
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *    }
 * [...]
 * ```
 *
 * The JSON is obtained from a push notification, or as a Base64 URL encoded JSON in QR codes generated
 * by the server.
 * JSON example:
 * ```json
 * {
 *   "nma_data" : {
 *     "token" : "b4b07559-f934-4597-a1c5-44d89f691e8f",
 *     "redeem_url" : "https://fido.siven.ch/nevisfido/token/redeem/authentication",
 *     "attributeName" : "some additional data to be included in the QR code"
 *   },
 *   "nma_data_content_type" : "application/json",
 *   "nma_data_version" : "1"
 * }
 */
export declare abstract class OutOfBandPayloadDecode extends Operation {
    /**
     * Specifies the JSON to be decoded.
     *
     * **IMPORTANT** \
     * You must provide either the JSON through this method, or the Base64 URL encoded representation
     * of the JSON with the {@link base64UrlEncoded} method. Only one of them can be provided.
     *
     * @param json the JSON.
     * @returns an {@link OutOfBandPayloadDecode} object.
     */
    abstract json(json: string): OutOfBandPayloadDecode;
    /**
     * Specifies the JSON as Base64 URL encoded string to be decoded.
     *
     * **IMPORTANT** \
     * You must provide either the Base64 URL encoded representation of the JSON through this method,
     * or the JSON itself with the {@link json} method. Only one of them can be provided.
     *
     * @param base64UrlEncoded the JSON encoded as a Base64 URL encoded string.
     * @returns an {@link OutOfBandPayloadDecode} object.
     */
    abstract base64UrlEncoded(base64UrlEncoded: string): OutOfBandPayloadDecode;
    /**
     * Specifies the object that will be invoked if the {@link OutOfBandPayload} was decoded.
     *
     * **IMPORTANT** \
     * Providing the {@link onSuccess} is required.
     *
     * @param onSuccess the callback which receives an optional {@link OutOfBandPayload}.
     * @returns an {@link OutOfBandPayloadDecode} object.
     */
    abstract onSuccess(onSuccess: (payload?: OutOfBandPayload) => void): OutOfBandPayloadDecode;
    /**
     * Specifies the object that will be invoked if the {@link OutOfBandPayload} could not be decoded.
     *
     * **IMPORTANT** \
     * Providing the {@link onError} is required.
     *
     * @param onError the callback which receives an {@link OutOfBandPayloadError}.
     * @returns an {@link OutOfBandPayloadDecode} object.
     */
    abstract onError(onError: (error: OutOfBandPayloadError) => void): OutOfBandPayloadDecode;
}
export declare class OutOfBandPayloadDecodeImpl extends OutOfBandPayloadDecode {
    private _json?;
    private _base64UrlEncoded?;
    private _onSuccess?;
    private _onError?;
    json(json: string): OutOfBandPayloadDecode;
    base64UrlEncoded(base64UrlEncoded: string): OutOfBandPayloadDecode;
    onSuccess(onSuccess: (payload?: OutOfBandPayload) => void): OutOfBandPayloadDecode;
    onError(onError: (error: OutOfBandPayloadError) => void): OutOfBandPayloadDecode;
    execute(): Promise<void>;
}
//# sourceMappingURL=OutOfBandPayloadDecode.d.ts.map