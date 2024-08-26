/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';

import type { Configuration } from './Configuration';
import { InitializationError } from './error/initialization/InitializationError';
import { InitializationErrorConverter } from './error/initialization/InitializationErrorConverter';
import {
	type MobileAuthenticationClient,
	MobileAuthenticationClientImpl,
} from './MobileAuthenticationClient';
import NevisMobileAuthenticationSdkReact from './MobileAuthenticationSdk';
import { InitClientMessage } from './model/messages/out/InitClientMessage';

/**
 * The class that creates and initializes asynchronously an instance of {@link MobileAuthenticationClient}.
 */
export class MobileAuthenticationClientInitializer {
	private _configuration?: Configuration;
	private _onSuccess?: (client: MobileAuthenticationClient) => void;
	private _onError?: (error: InitializationError) => void;

	/**
	 * Sets the configuration of the {@link MobileAuthenticationClient}.
	 *
	 * **IMPORTANT** \
	 * Providing the configuration is required.
	 *
	 * @param configuration the {@link MobileAuthenticationClient} configuration.
	 * @returns an initializer
	 */
	configuration(configuration: Configuration) {
		this._configuration = configuration;
		return this;
	}

	/**
	 * The method invoked when the {@link MobileAuthenticationClient} could be successfully built after
	 * invoking {@link execute}.
	 *
	 * **IMPORTANT** \
	 * Providing the callback handling the {@link MobileAuthenticationClient} is required.
	 *
	 * @param onSuccess the callback handling the {@link MobileAuthenticationClient}.
	 * @returns an initializer.
	 */
	onSuccess(onSuccess: (client: MobileAuthenticationClient) => void) {
		this._onSuccess = onSuccess;
		return this;
	}

	/**
	 * The method invoked when an error occurs after invoking {@link execute}.
	 *
	 * **IMPORTANT** \
	 * Providing the callback handling the error is required.
	 *
	 * @param onError the callback handling the error.
	 * @returns an initializer.
	 */
	onError(onError: (error: InitializationError) => void) {
		this._onError = onError;
		return this;
	}

	/**
	 * Starts the creation of an instance of the {@link MobileAuthenticationClient}. If an error
	 * occurs, it is provided through {@link onError}, if the {@link MobileAuthenticationClient}
	 * can be successfully built and initialized, it is provided through {@link onSuccess}.
	 */
	async execute(): Promise<void> {
		const message = new InitClientMessage(
			uuid.v4() as string,
			this._onSuccess !== undefined,
			this._onError !== undefined,
			this._configuration
		);

		return NevisMobileAuthenticationSdkReact.initClient(message)
			.then(() => {
				this._onSuccess?.(new MobileAuthenticationClientImpl());
			})
			.catch((error: Error) => {
				const initializationError = new InitializationErrorConverter(error).convert();
				this._onError?.(initializationError);
			});
	}
}
