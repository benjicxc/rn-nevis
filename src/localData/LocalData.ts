/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import { type Account } from './Account';
import { type Authenticator } from './Authenticator';
import { type DeviceInformation } from './DeviceInformation';
import { DeleteAuthenticatorErrorConverter } from '../error/localData/DeleteAuthenticatorErrorConverter';
import NevisMobileAuthenticationSdkReact from '../MobileAuthenticationSdk';
import { LocalAccountsMessage } from '../model/messages/in/LocalAccountsMessage';
import { LocalAuthenticatorsMessage } from '../model/messages/in/LocalAuthenticatorsMessage';
import { LocalDeviceInformationMessage } from '../model/messages/in/LocalDeviceInformationMessage';
import { LocalDeleteAuthenticatorMessage } from '../model/messages/out/LocalDeleteAuthenticatorMessage';
import { OperationIdMessage } from '../model/messages/out/OperationIdMessage';

/**
 * An interface that provides information about the information that is stored locally in the SDK.
 * This includes authenticator and device information. The interface also allows to delete
 * the data locally.
 *
 * @see {@link MobileAuthenticationClient.localData}
 */
export abstract class LocalData {
	/**
	 * Convenience method that returns all the registered accounts.
	 *
	 * @returns all the registered accounts.
	 */
	abstract accounts(): Promise<Array<Account>>;

	/**
	 * Returns information about the authenticators. This information can be used for instance
	 * to know whether there is a registered authenticator or not, and thus if the user must
	 * register an authenticator or if authentication is possible.
	 *
	 * @returns all the authenticators.
	 */
	abstract authenticators(): Promise<Array<Authenticator>>;

	/**
	 * Returns information about the configured {@link DeviceInformation} (if any).
	 *
	 * @returns information about the device.
	 */
	abstract deviceInformation(): Promise<DeviceInformation | undefined>;

	/**
	 * Deletes all the data managed by the SDK regarding the provided authenticator.
	 *
	 * If the authenticator is registered, it will delete the associated FIDO UAF
	 * credentials of the provided user.
	 * If the authenticator is managed by the SDK (PIN authenticator), and the
	 * specified user is the only registered user, it will also delete the PIN
	 * definition (i.e. the authenticator will no longer be enrolled).
	 * f the username is not specified the authenticator deletion will be performed
	 * for all user.
	 *
	 * **NOTE** \
	 * This method will only delete data locally. The FIDO UAF credentials will
	 * not be deleted from the server. This method should only be used when going
	 * through the protocol to delete authenticator information is not possible.
	 * For instance when the PIN authenticator is locked, which may be due to a
	 * security attack, and then it is desirable to delete the credentials locally.
	 * Using the {@link Deregistration} operation is the recommended way of deleting
	 * the FIDO UAF credentials.
	 *
	 * **NOTE** \
	 * If no AAID is provided then all authenticators will be deleted.
	 *
	 * @param username the username whose authenticator must be deleted.
	 * @param aaid the AAID of the {@link Authenticator} whose data must be deleted.
	 */
	abstract deleteAuthenticator(username: string, aaid?: string): Promise<void>;
}

/**
 * Default implementation of {@link LocalData}.
 */
export class LocalDataImpl extends LocalData {
	async accounts(): Promise<Array<Account>> {
		const operationId = uuid.v4() as string;
		const message = new OperationIdMessage(operationId);
		return NevisMobileAuthenticationSdkReact.localAccounts(message).then(
			(result: LocalAccountsMessage) => {
				const resultMessage = LocalAccountsMessage.fromJson(result);
				return resultMessage.accounts;
			}
		);
	}

	async authenticators(): Promise<Array<Authenticator>> {
		const operationId = uuid.v4() as string;
		const message = new OperationIdMessage(operationId);
		return NevisMobileAuthenticationSdkReact.localAuthenticators(message).then(
			(result: LocalAuthenticatorsMessage) => {
				const resultMessage = LocalAuthenticatorsMessage.fromJson(result);
				return resultMessage.authenticators;
			}
		);
	}

	async deviceInformation(): Promise<DeviceInformation | undefined> {
		const operationId = uuid.v4() as string;
		const message = new OperationIdMessage(operationId);
		return NevisMobileAuthenticationSdkReact.localDeviceInformation(message).then(
			(result: LocalDeviceInformationMessage) => {
				const resultMessage = LocalDeviceInformationMessage.fromJson(result);
				return resultMessage.deviceInformation;
			}
		);
	}

	async deleteAuthenticator(username: string, aaid?: string): Promise<void> {
		const operationId = uuid.v4() as string;
		const message = new LocalDeleteAuthenticatorMessage(operationId, username, aaid);
		return NevisMobileAuthenticationSdkReact.localDeleteAuthenticator(message).catch(
			(error: any) => {
				const deleteAuthenticatorError = new DeleteAuthenticatorErrorConverter(
					error
				).convert();
				return Promise.reject(deleteAuthenticatorError);
			}
		);
	}
}
