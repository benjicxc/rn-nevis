/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import uuid from 'react-native-uuid';
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
export class LocalData {}

/**
 * Default implementation of {@link LocalData}.
 */
export class LocalDataImpl extends LocalData {
  async accounts() {
    const operationId = uuid.v4();
    const message = new OperationIdMessage(operationId);
    return NevisMobileAuthenticationSdkReact.localAccounts(message).then(result => {
      const resultMessage = LocalAccountsMessage.fromJson(result);
      return resultMessage.accounts;
    });
  }
  async authenticators() {
    const operationId = uuid.v4();
    const message = new OperationIdMessage(operationId);
    return NevisMobileAuthenticationSdkReact.localAuthenticators(message).then(result => {
      const resultMessage = LocalAuthenticatorsMessage.fromJson(result);
      return resultMessage.authenticators;
    });
  }
  async deviceInformation() {
    const operationId = uuid.v4();
    const message = new OperationIdMessage(operationId);
    return NevisMobileAuthenticationSdkReact.localDeviceInformation(message).then(result => {
      const resultMessage = LocalDeviceInformationMessage.fromJson(result);
      return resultMessage.deviceInformation;
    });
  }
  async deleteAuthenticator(username, aaid) {
    const operationId = uuid.v4();
    const message = new LocalDeleteAuthenticatorMessage(operationId, username, aaid);
    return NevisMobileAuthenticationSdkReact.localDeleteAuthenticator(message).catch(error => {
      const deleteAuthenticatorError = new DeleteAuthenticatorErrorConverter(error).convert();
      return Promise.reject(deleteAuthenticatorError);
    });
  }
}
//# sourceMappingURL=LocalData.js.map