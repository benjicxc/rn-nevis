/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { HttpOperation, HttpOperationImpl } from './HttpOperation';
import { RetryPolicy } from './RetryPolicy';
import { UserInteractionPlatformOperationImpl } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { DeviceInformationChangeError } from '../error/deviceInformationChange/DeviceInformationChangeError';
import { DeviceInformationChangeErrorConverter } from '../error/deviceInformationChange/DeviceInformationChangeErrorConverter';
import { NativeEventListener } from '../event/NativeEventListener';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { DeviceInformationChangeMessage } from '../model/messages/out/DeviceInformationChangeMessage';

/**
 * The object that changes the device information.
 *
 * The device information change can be used to
 *  - modify the name of the device and/or
 *  - modify its Firebase registration token or
 *  - disable push notifications.
 *
 * If neither {@link name} or {@link fcmRegistrationToken} are provided, the provided {@link onSuccess}
 * callback will be executed when {@link execute} is invoked.
 *
 * Usage example for changing device information:
 * ```ts
 *   [...]
 *   async updateDeviceInformation(
 *       client: MobileAuthenticationClient,
 *       newName: string,
 *       fcmToken: string
 *   ): Promise<void> {
 *       await client.operations.deviceInformationChange
 *           .name(newName)
 *           .fcmRegistrationToken(fcmToken)
 *           .onSuccess(() => {
 *               // handle success
 *           })
 *           .onError((_error) => {
 *               // handle error
 *           })
 *           .execute();
 *   }
 *   [...]
 * ```
 */
export abstract class DeviceInformationChange extends HttpOperation<DeviceInformationChange> {
	/**
	 * Specifies the new name of the device information.
	 *
	 * This is typically a user-friendly string describing the mobile device where the application
	 * is running.
	 *
	 * **IMPORTANT** \
	 * Do not invoke this method if the name does not need to be updated.
	 *
	 * @param name the new device information name.
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract name(name: string): DeviceInformationChange;

	/**
	 * Specifies the new {@link https://firebase.google.com/docs/cloud-messaging/js/client | Firebase Cloud Messaging}
	 * registration token.
	 *
	 * **IMPORTANT** \
	 * Do not invoke this method if the Firebase Cloud Messaging registration token does not need to
	 * be updated.
	 *
	 * @param fcmRegistrationToken the new Firebase Cloud Messaging registration token.
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract fcmRegistrationToken(fcmRegistrationToken: string): DeviceInformationChange;

	/**
	 * Disables the push notifications on the server side (i.e. the server will not send authentication
	 * push notifications).
	 *
	 * To re-enable the sending of push notifications, execute a {@link DeviceInformationChange} and
	 * provide the Firebase Cloud Messaging registration token through the method {@link fcmRegistrationToken}.
	 *
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract disablePushNotifications(): DeviceInformationChange;

	/**
	 * Specifies the retry policy to be used.
	 *
	 * For some errors (such as networking errors) retrying is meaningful, this parameter specifies
	 * the retry policy to be followed if one of these errors occurs.
	 *
	 * If no retry policy is provided {@link NoRetryPolicy} will be used.
	 *
	 * @param retryPolicy the retry policy.
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract retryPolicy(retryPolicy: RetryPolicy): DeviceInformationChange;

	/**
	 * Specifies the object that will be invoked if the device information for the user was updated
	 * successfully.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onSuccess} is required.
	 *
	 * @param onSuccess the function which is invoked on successful update.
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract onSuccess(onSuccess: () => void): DeviceInformationChange;

	/**
	 * Specifies the object that will be invoked if the dispatch device information change failed.
	 *
	 * **IMPORTANT** \
	 * Providing the {@link onError} is required.
	 *
	 * @param onError the function which receives a {@link DeviceInformationChangeError}.
	 * @returns a {@link DeviceInformationChange} object.
	 */
	abstract onError(
		onError: (error: DeviceInformationChangeError) => void
	): DeviceInformationChange;
}

export class DeviceInformationChangeImpl
	extends HttpOperationImpl<DeviceInformationChange>
	implements DeviceInformationChange
{
	private _name?: string;
	private _fcmRegistrationToken?: string;
	private _disablePushNotifications?: boolean;
	private _retryPolicy?: RetryPolicy;
	private _onSuccess?: () => void;
	private _onError?: (error: DeviceInformationChangeError) => void;

	name(name: string): DeviceInformationChange {
		this._name = name;
		return this;
	}

	fcmRegistrationToken(fcmRegistrationToken: string): DeviceInformationChange {
		this._fcmRegistrationToken = fcmRegistrationToken;
		return this;
	}

	disablePushNotifications(): DeviceInformationChange {
		this._disablePushNotifications = true;
		return this;
	}

	retryPolicy(retryPolicy: RetryPolicy): DeviceInformationChange {
		this._retryPolicy = retryPolicy;
		return this;
	}

	onSuccess(onSuccess: () => void): DeviceInformationChange {
		this._onSuccess = onSuccess;
		return this;
	}

	onError(onError: (error: DeviceInformationChangeError) => void): DeviceInformationChange {
		this._onError = onError;
		return this;
	}

	async execute(): Promise<void> {
		const operationId = uuid.v4() as string;
		const operation = new UserInteractionPlatformOperationImpl(operationId);

		PlatformOperationCache.getInstance().put(operation);
		NativeEventListener.getInstance().start();

		const message = new DeviceInformationChangeMessage(
			operationId,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this.httpRequestHeaders,
			this._name,
			this._fcmRegistrationToken,
			this._disablePushNotifications,
			this._retryPolicy
		);

		function finish() {
			NativeEventListener.getInstance().stop();
			PlatformOperationCache.getInstance().delete(operationId);
		}

		return NevisMobileAuthenticationSdkReact.deviceInformationChange(message)
			.then(() => {
				finish();
				this._onSuccess?.();
			})
			.catch((error: Error) => {
				finish();
				const deviceInformationChangeError = new DeviceInformationChangeErrorConverter(
					error
				).convert();
				this._onError?.(deviceInformationChangeError);
			});
	}
}
