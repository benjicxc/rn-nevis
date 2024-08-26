"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeEventListener = void 0;
var _reactNative = require("react-native");
var _OutOfBandPlatformOperation = require("../cache/operation/OutOfBandPlatformOperation");
var _UserInteractionPlatformOperation = require("../cache/operation/UserInteractionPlatformOperation");
var _PlatformOperationCache = require("../cache/PlatformOperationCache");
var _AuthenticatorExtension = require("../extensions/AuthenticatorExtension");
var _OnValidCredentialsProvidedMessage = require("../model/messages/in/OnValidCredentialsProvidedMessage");
var _OperationTypeMessage = require("../model/messages/in/OperationTypeMessage");
var _PinChangerMessage = require("../model/messages/in/PinChangerMessage");
var _PinEnrollerMessage = require("../model/messages/in/PinEnrollerMessage");
var _SelectAccountMessage = require("../model/messages/in/SelectAccountMessage");
var _SelectAuthenticatorMessage = require("../model/messages/in/SelectAuthenticatorMessage");
var _VerifyUserMessage = require("../model/messages/in/VerifyUserMessage");
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

class NativeEventListener {
  constructor() {
    this._eventEmitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.RNEventEmitter);
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
      const message = _SelectAccountMessage.SelectAccountMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        operation.selectAccount(message.context);
      }
    });
  }
  listenToSelectAuthenticator() {
    this._selectAuthenticator = this._eventEmitter.addListener('selectAuthenticator', data => {
      const message = _SelectAuthenticatorMessage.SelectAuthenticatorMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        operation.selectAuthenticator(message.context);
      }
    });
  }
  listenToEnrollPin() {
    this._enrollPin = this._eventEmitter.addListener('pinEnroll', data => {
      const message = _PinEnrollerMessage.PinEnrollerMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        operation.enrollPin(message.context);
      }
    });
  }
  listenToChangePin() {
    this._changePin = this._eventEmitter.addListener('pinChange', data => {
      const message = _PinChangerMessage.PinChangerMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        operation.changePin(message.context);
      }
    });
  }
  listenToVerifyUser() {
    this._verifyUser = this._eventEmitter.addListener('verifyUser', async data => {
      const message = _VerifyUserMessage.VerifyUserMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        const handler = _AuthenticatorExtension.AuthenticatorExtension.handlerByAuthenticator(message.context.authenticator.aaid, message.operationId);
        await operation.verifyUser(message.context, handler);
      }
    });
  }
  listenToOnValidCredentialsProvided() {
    // listenToOnValidCredentialsProvided is only supported on Android platform
    if (_reactNative.Platform.OS !== 'android') {
      return;
    }
    this._onValidCredentialsProvided = this._eventEmitter.addListener('onValidCredentialsProvided', data => {
      const message = _OnValidCredentialsProvidedMessage.OnValidCredentialsProvidedMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _UserInteractionPlatformOperation.UserInteractionPlatformOperation) {
        operation.onValidCredentialsProvided(message.authenticator);
      }
    });
  }
  listenToOnOperationType() {
    this._onOperationType = this._eventEmitter.addListener('operationType', data => {
      const message = _OperationTypeMessage.OperationTypeMessage.fromJson(data);
      const operation = _PlatformOperationCache.PlatformOperationCache.getInstance().read(message.operationId);
      if (operation && operation instanceof _OutOfBandPlatformOperation.OutOfBandPlatformOperation) {
        operation.updateOperationType(message.operationType);
      }
    });
  }
}
exports.NativeEventListener = NativeEventListener;
//# sourceMappingURL=NativeEventListener.js.map