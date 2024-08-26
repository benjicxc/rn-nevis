/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
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
  constructor() {
    this._eventEmitter = new NativeEventEmitter(NativeModules.RNEventEmitter);
  }
  static getInstance() {
    if (!NativeEventListener.instance) {
      NativeEventListener.instance = new NativeEventListener();
    }
    return NativeEventListener.instance;
  }
  start() {
    this.listenToSelectAccount();
    this.listenToSelectAuthenticator();
    this.listenToChangePin();
    this.listenToEnrollPin();
    this.listenToVerifyUser();
    this.listenToOnValidCredentialsProvided();
    this.listenToOnOperationType();
  }
  stop() {
    var _this$_selectAccount, _this$_selectAuthenti, _this$_enrollPin, _this$_changePin, _this$_verifyUser, _this$_onValidCredent, _this$_onOperationTyp;
    (_this$_selectAccount = this._selectAccount) === null || _this$_selectAccount === void 0 || _this$_selectAccount.remove();
    (_this$_selectAuthenti = this._selectAuthenticator) === null || _this$_selectAuthenti === void 0 || _this$_selectAuthenti.remove();
    (_this$_enrollPin = this._enrollPin) === null || _this$_enrollPin === void 0 || _this$_enrollPin.remove();
    (_this$_changePin = this._changePin) === null || _this$_changePin === void 0 || _this$_changePin.remove();
    (_this$_verifyUser = this._verifyUser) === null || _this$_verifyUser === void 0 || _this$_verifyUser.remove();
    (_this$_onValidCredent = this._onValidCredentialsProvided) === null || _this$_onValidCredent === void 0 || _this$_onValidCredent.remove();
    (_this$_onOperationTyp = this._onOperationType) === null || _this$_onOperationTyp === void 0 || _this$_onOperationTyp.remove();
  }
  listenToSelectAccount() {
    this._selectAccount = this._eventEmitter.addListener('selectAccount', data => {
      const message = SelectAccountMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        operation.selectAccount(message.context);
      }
    });
  }
  listenToSelectAuthenticator() {
    this._selectAuthenticator = this._eventEmitter.addListener('selectAuthenticator', data => {
      const message = SelectAuthenticatorMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        operation.selectAuthenticator(message.context);
      }
    });
  }
  listenToEnrollPin() {
    this._enrollPin = this._eventEmitter.addListener('pinEnroll', data => {
      const message = PinEnrollerMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        operation.enrollPin(message.context);
      }
    });
  }
  listenToChangePin() {
    this._changePin = this._eventEmitter.addListener('pinChange', data => {
      const message = PinChangerMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        operation.changePin(message.context);
      }
    });
  }
  listenToVerifyUser() {
    this._verifyUser = this._eventEmitter.addListener('verifyUser', async data => {
      const message = VerifyUserMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        const handler = AuthenticatorExtension.handlerByAuthenticator(message.context.authenticator.aaid, message.operationId);
        await operation.verifyUser(message.context, handler);
      }
    });
  }
  listenToOnValidCredentialsProvided() {
    // listenToOnValidCredentialsProvided is only supported on Android platform
    if (Platform.OS !== 'android') {
      return;
    }
    this._onValidCredentialsProvided = this._eventEmitter.addListener('onValidCredentialsProvided', data => {
      const message = OnValidCredentialsProvidedMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof UserInteractionPlatformOperation) {
        operation.onValidCredentialsProvided(message.authenticator);
      }
    });
  }
  listenToOnOperationType() {
    this._onOperationType = this._eventEmitter.addListener('operationType', data => {
      const message = OperationTypeMessage.fromJson(data);
      const operation = PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof OutOfBandPlatformOperation) {
        operation.updateOperationType(message.operationType);
      }
    });
  }
}
//# sourceMappingURL=NativeEventListener.js.map