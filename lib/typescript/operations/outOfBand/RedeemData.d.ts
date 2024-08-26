/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
/**
 * A `RedeemData` instance contains information to be redeemed in order to trigger FIDO UAF operations.
 * The information is extracted from different channels like QR-Code, Push Notification, etc.
 */
export declare abstract class RedeemData {
    /**
     * The token that must be redeemed in the backend.
     */
    abstract token: string;
    /**
     * The URI where the token must be redeemed.
     */
    abstract redeemUrl: URL;
    /**
     * Alternate constructor that creates a {@link RedeemData} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns a {@link RedeemData} instance.
     */
    static fromJson(json: any): RedeemData;
}
export declare class RedeemDataImpl extends RedeemData {
    token: string;
    redeemUrl: URL;
    constructor(token: string, redeemUrl: URL);
    static fromJson(json: any): RedeemDataImpl;
}
//# sourceMappingURL=RedeemData.d.ts.map