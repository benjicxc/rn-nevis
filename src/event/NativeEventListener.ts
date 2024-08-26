/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import {
	type EmitterSubscription,
	NativeEventEmitter,
	NativeModules,
	Platform,
} from 'react-native';

import { OutOfBandPlatformOperation } from '../cache/operation/OutOfBandPlatformOperation';
import { UserInteractionPlatformOperation } from '../cache/operation/UserInteractionPlatformOperation';
import { PlatformOperationCache } from '../cache/PlatformOperationCache';
import { AuthenticatorExtension } from '../extensions/AuthenticatorExtension';
import { OnValidCredentialsProvidedMessage } from '../model/messages/in/OnValidCredentialsProvidedMessage';
import { OperationTypeMessage } from '../model/messages/in/OperationTypeMessage';
import { PinChangerMessage } from '../model/messages/in/PinChangerMessage';
import { PinEnrollerMessage } from '../model/messages/in/PinEnrollerMessage';
import { SelectAccountMessage } from '../model/messages/in/SelectAccountMessage';
import { SelectAuthenticatorMessage } from '../model/messages/in/SelectAuthenticatorMessage';
import { VerifyUserMessage } from '../model/messages/in/VerifyUserMessage';

export class NativeEventListener {
	private static instance: NativeEventListener;

	private _eventEmitter: NativeEventEmitter;
	private _selectAccount?: EmitterSubscription;
	private _selectAuthenticator?: EmitterSubscription;
	private _enrollPin?: EmitterSubscription;
	private _changePin?: EmitterSubscription;
	private _verifyUser?: EmitterSubscription;
	private _onValidCredentialsProvided?: EmitterSubscription;
	private _onOperationType?: EmitterSubscription;

	private constructor() {
		this._eventEmitter = new NativeEventEmitter(NativeModules.RNEventEmitter);
	}

	static getInstance(): NativeEventListener {
		if (!NativeEventListener.instance) {
			NativeEventListener.instance = new NativeEventListener();
		}

		return NativeEventListener.instance;
	}

	start(): void {
		this.listenToSelectAccount();
		this.listenToSelectAuthenticator();
		this.listenToChangePin();
		this.listenToEnrollPin();
		this.listenToVerifyUser();
		this.listenToOnValidCredentialsProvided();
		this.listenToOnOperationType();
	}

	stop(): void {
		this._selectAccount?.remove();
		this._selectAuthenticator?.remove();
		this._enrollPin?.remove();
		this._changePin?.remove();
		this._verifyUser?.remove();
		this._onValidCredentialsProvided?.remove();
		this._onOperationType?.remove();
	}

	listenToSelectAccount(): void {
		this._selectAccount = this._eventEmitter.addListener('selectAccount', (data) => {
			const message = SelectAccountMessage.fromJson(data);
			const operation = PlatformOperationCache.getInstance().read(message.operationId);
			if (operation && operation instanceof UserInteractionPlatformOperation) {
				operation.selectAccount(message.context);
			}
		});
	}

	listenToSelectAuthenticator(): void {
		this._selectAuthenticator = this._eventEmitter.addListener(
			'selectAuthenticator',
			(data) => {
				const message = SelectAuthenticatorMessage.fromJson(data);
				const operation = PlatformOperationCache.getInstance().read(message.operationId);
				if (operation && operation instanceof UserInteractionPlatformOperation) {
					operation.selectAuthenticator(message.context);
				}
			}
		);
	}

	listenToEnrollPin(): void {
		this._enrollPin = this._eventEmitter.addListener('pinEnroll', (data) => {
			const message = PinEnrollerMessage.fromJson(data);
			const operation = PlatformOperationCache.getInstance().read(message.operationId);
			if (operation && operation instanceof UserInteractionPlatformOperation) {
				operation.enrollPin(message.context);
			}
		});
	}

	listenToChangePin(): void {
		this._changePin = this._eventEmitter.addListener('pinChange', (data) => {
			const message = PinChangerMessage.fromJson(data);
			const operation = PlatformOperationCache.getInstance().read(message.operationId);
			if (operation && operation instanceof UserInteractionPlatformOperation) {
				operation.changePin(message.context);
			}
		});
	}

	listenToVerifyUser(): void {
		this._verifyUser = this._eventEmitter.addListener('verifyUser', async (data) => {
			const message = VerifyUserMessage.fromJson(data);
			const operation = PlatformOperationCache.getInstance().read(message.operationId);
			if (operation && operation instanceof UserInteractionPlatformOperation) {
				const handler = AuthenticatorExtension.handlerByAuthenticator(
					message.context.authenticator.aaid,
					message.operationId
				);
				await operation.verifyUser(message.context, handler);
			}
		});
	}

	listenToOnValidCredentialsProvided(): void {
		// listenToOnValidCredentialsProvided is only supported on Android platform
		if (Platform.OS !== 'android') {
			return;
		}

		this._onValidCredentialsProvided = this._eventEmitter.addListener(
			'onValidCredentialsProvided',
			(data) => {
				const message = OnValidCredentialsProvidedMessage.fromJson(data);
				const operation = PlatformOperationCache.getInstance().read(message.operationId);
				if (operation && operation instanceof UserInteractionPlatformOperation) {
					operation.onValidCredentialsProvided(message.authenticator);
				}
			}
		);
	}

	listenToOnOperationType(): void {
		this._onOperationType = this._eventEmitter.addListener('operationType', (data) => {
			const message = OperationTypeMessage.fromJson(data);
			const operation = PlatformOperationCache.getInstance().read(message.operationId);
			if (operation && operation instanceof OutOfBandPlatformOperation) {
				operation.updateOperationType(message.operationType);
			}
		});
	}
}
