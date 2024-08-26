"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalDataImpl = exports.LocalData = void 0;
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _DeleteAuthenticatorErrorConverter = require("../error/localData/DeleteAuthenticatorErrorConverter");
var _MobileAuthenticationSdk = _interopRequireDefault(require("../MobileAuthenticationSdk"));
var _LocalAccountsMessage = require("../model/messages/in/LocalAccountsMessage");
var _LocalAuthenticatorsMessage = require("../model/messages/in/LocalAuthenticatorsMessage");
var _LocalDeviceInformationMessage = require("../model/messages/in/LocalDeviceInformationMessage");
var _LocalDeleteAuthenticatorMessage = require("../model/messages/out/LocalDeleteAuthenticatorMessage");
var _OperationIdMessage = require("../model/messages/out/OperationIdMessage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * An interface that provides information about the information that is stored locally in the SDK.
 * This includes authenticator and device information. The interface also allows to delete
 * the data locally.
 *
 * @see {@link MobileAuthenticationClient.localData}
 */
class LocalData {}

/**
 * Default implementation of {@link LocalData}.
 */
exports.LocalData = LocalData;
class LocalDataImpl extends LocalData {
  async accounts() {
    const operationId = _reactNativeUuid.default.v4();
    const message = new _OperationIdMessage.OperationIdMessage(operationId);
    return _MobileAuthenticationSdk.default.localAccounts(message).then(result => {
      const resultMessage = _LocalAccountsMessage.LocalAccountsMessage.fromJson(result);
      return resultMessage.accounts;
    });
  }
  async authenticators() {
    const operationId = _reactNativeUuid.default.v4();
    const message = new _OperationIdMessage.OperationIdMessage(operationId);
    return _MobileAuthenticationSdk.default.localAuthenticators(message).then(result => {
      const resultMessage = _LocalAuthenticatorsMessage.LocalAuthenticatorsMessage.fromJson(result);
      return resultMessage.authenticators;
    });
  }
  async deviceInformation() {
    const operationId = _reactNativeUuid.default.v4();
    const message = new _OperationIdMessage.OperationIdMessage(operationId);
    return _MobileAuthenticationSdk.default.localDeviceInformation(message).then(result => {
      const resultMessage = _LocalDeviceInformationMessage.LocalDeviceInformationMessage.fromJson(result);
      return resultMessage.deviceInformation;
    });
  }
  async deleteAuthenticator(username, aaid) {
    const operationId = _reactNativeUuid.default.v4();
    const message = new _LocalDeleteAuthenticatorMessage.LocalDeleteAuthenticatorMessage(operationId, username, aaid);
    return _MobileAuthenticationSdk.default.localDeleteAuthenticator(message).catch(error => {
      const deleteAuthenticatorError = new _DeleteAuthenticatorErrorConverter.DeleteAuthenticatorErrorConverter(error).convert();
      return Promise.reject(deleteAuthenticatorError);
    });
  }
}
exports.LocalDataImpl = LocalDataImpl;
//# sourceMappingURL=LocalData.js.map