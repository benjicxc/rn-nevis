/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { ContentType } from './ContentType';
import { RedeemData } from './RedeemData';
/**
 * This object describes the contents that are sent by nevisFIDO in the out-of-band use case to start
 * an operation (registration, authentication or deregistration).
 *
 * This object can be obtained from its JSON representation, which is included in a push notification
 * message, in a QR code or in a universal link, depending on the out-of-band mechanism used.
 *
 * @see {@link OutOfBandPayloadDecode}
 */
export declare abstract class OutOfBandPayload {
    /**
     * The content type of the NMA (Nevis Mobile Authentication) data.
     * The provided content type defines whether the NMA data is encrypted or not.
     */
    abstract contentType: ContentType;
    /**
     * The version of the NMA (Nevis Mobile Authentication) data.
     *
     * This can be used to validate that the contents in the out-of-band payload are compatible with
     * the client.
     */
    abstract version: string;
    /**
     * The object containing the redemption information.
     */
    abstract redeemData: RedeemData;
    /**
     * The optional additional information that it was provided when triggering the out-of-band operation.
     *
     * Note that the format of the String is defined by the nevisFIDO client triggering the operation:
     * it can be plain text or JSON for example.
     * See the data attribute described in the "Dispatch Token Request Format" section of the nevisFIDO
     * reference guide for additional information.
     */
    abstract data?: string;
    /**
     * Alternate constructor that creates an {@link OutOfBandPayload} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns an {@link OutOfBandPayload} instance.
     */
    static fromJson(json: any): OutOfBandPayload;
}
export declare class OutOfBandPayloadImpl extends OutOfBandPayload {
    contentType: ContentType;
    version: string;
    redeemData: RedeemData;
    data?: string;
    constructor(contentType: ContentType, version: string, redeemData: RedeemData, data?: string);
    static fromJson(json: any): OutOfBandPayloadImpl;
}
//# sourceMappingURL=OutOfBandPayload.d.ts.map