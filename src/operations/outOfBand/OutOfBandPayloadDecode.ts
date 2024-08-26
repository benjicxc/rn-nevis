/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { OutOfBandPayload } from './OutOfBandPayload';
import { UserInteractionPlatformOperationImpl } from '../../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../../cache/PlatformOperationCache';
import type { OutOfBandPayloadError } from '../../error/outOfBand/payload/OutOfBandPayloadError';
import { OutOfBandPayloadErrorConverter } from '../../error/outOfBand/payload/OutOfBandPayloadErrorConverter';
import { NativeEventListener } from '../../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../../MobileAuthenticationSdk';
import { OnSuccessMessage } from '../../model/messages/in/OnSuccessMessage';
import { OutOfBandPayloadDecodeMessage } from '../../model/messages/out/OutOfBandPayloadDecodeMessage';
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
export abstract class OutOfBandPayloadDecode extends Operation {
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

export class OutOfBandPayloadDecodeImpl extends OutOfBandPayloadDecode {
	private _json?: string;
	private _base64UrlEncoded?: string;
	private _onSuccess?: (payload?: OutOfBandPayload) => void;
	private _onError?: (error: OutOfBandPayloadError) => void;

	json(json: string): OutOfBandPayloadDecode {
		this._json = json;
		return this;
	}

	base64UrlEncoded(base64UrlEncoded: string): OutOfBandPayloadDecode {
		this._base64UrlEncoded = base64UrlEncoded;
		return this;
	}

	onSuccess(onSuccess: (payload?: OutOfBandPayload) => void): OutOfBandPayloadDecode {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: OutOfBandPayloadError) => void): OutOfBandPayloadDecode {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const operation = new UserInteractionPlatformOperationImpl(operationId);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new OutOfBandPayloadDecodeMessage(
			operationId,
			this._onSuccess !== undefined,
			this.onError !== undefined,
			this._json,
			this._base64UrlEncoded
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.payloadDecode(message)
			.then((result: OnSuccessMessage) => {
				finish();
				const successMessage = OnSuccessMessage.fromJson(result);
				this._onSuccess?.(successMessage.outOfBandPayload);
			})
			.catch((error: any) => {
				finish();
				const payloadError = new OutOfBandPayloadErrorConverter(error).convert();
				this._onError?.(payloadError);
			});
	}
}
