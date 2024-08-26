/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

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
export class OutOfBandPayload {
  /**
   * The content type of the NMA (Nevis Mobile Authentication) data.
   * The provided content type defines whether the NMA data is encrypted or not.
   */

  /**
   * The version of the NMA (Nevis Mobile Authentication) data.
   *
   * This can be used to validate that the contents in the out-of-band payload are compatible with
   * the client.
   */

  /**
   * The object containing the redemption information.
   */

  /**
   * The optional additional information that it was provided when triggering the out-of-band operation.
   *
   * Note that the format of the String is defined by the nevisFIDO client triggering the operation:
   * it can be plain text or JSON for example.
   * See the data attribute described in the "Dispatch Token Request Format" section of the nevisFIDO
   * reference guide for additional information.
   */

  /**
   * Alternate constructor that creates an {@link OutOfBandPayload} from a json.
   *
   * @param json contains the source for instance creation.
   * @returns an {@link OutOfBandPayload} instance.
   */
  static fromJson(json) {
    return OutOfBandPayloadImpl.fromJson(json);
  }
}
export class OutOfBandPayloadImpl extends OutOfBandPayload {
  constructor(contentType, version, redeemData, data) {
    super();
    this.contentType = contentType;
    this.version = version;
    this.redeemData = redeemData;
    this.data = data;
  }
  static fromJson(json) {
    const redeemData = RedeemData.fromJson(json.redeemData);
    return new OutOfBandPayloadImpl(json.contentType, json.version, redeemData, json.data);
  }
}
//# sourceMappingURL=OutOfBandPayload.js.map