/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { TurboModule } from 'react-native';
import type { IsPolicyCompliantInMessage } from './model/messages/in/IsPolicyCompliantInMessage';
import { LocalAccountsMessage } from './model/messages/in/LocalAccountsMessage';
import { LocalAuthenticatorsMessage } from './model/messages/in/LocalAuthenticatorsMessage';
import { LocalDeviceInformationMessage } from './model/messages/in/LocalDeviceInformationMessage';
import { OnSuccessMessage } from './model/messages/in/OnSuccessMessage';
export interface Spec extends TurboModule {
    initClient(message: Object): Promise<void>;
    payloadDecode(message: Object): Promise<OnSuccessMessage>;
    oobOperation(message: Object): Promise<void>;
    oobRegister(message: Object): Promise<void>;
    oobAuthenticate(message: Object): Promise<OnSuccessMessage>;
    inBandRegister(message: Object): Promise<void>;
    authCloudApiRegister(message: Object): Promise<void>;
    authenticate(message: Object): Promise<OnSuccessMessage>;
    deregister(message: Object): Promise<void>;
    deviceInformationChange(message: Object): Promise<void>;
    pinChange(message: Object): Promise<void>;
    localAccounts(message: Object): Promise<LocalAccountsMessage>;
    localAuthenticators(message: Object): Promise<LocalAuthenticatorsMessage>;
    localDeleteAuthenticator(message: Object): Promise<void>;
    localDeviceInformation(message: Object): Promise<LocalDeviceInformationMessage>;
    authenticatorAaid(message: Object): Promise<void>;
    pinEnroll(message: Object): Promise<void>;
    pinsChange(message: Object): Promise<void>;
    pinVerify(message: Object): Promise<void>;
    accountUsername(name: Object): Promise<void>;
    cancel(message: Object): Promise<void>;
    isPolicyCompliant(message: Object): Promise<IsPolicyCompliantInMessage>;
    listenForOsCredentials(message: Object): Promise<void>;
    cancelAuthentication(message: Object): Promise<void>;
    pauseListening(message: Object): Promise<void>;
    resumeListening(message: Object): Promise<void>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeNevisMobileAuthenticationSdkReact.d.ts.map