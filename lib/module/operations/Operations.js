/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiRegistrationImpl } from './AuthCloudApiRegistration';
import { AuthenticationImpl } from './Authentication';
import { DeregistrationImpl } from './Deregistration';
import { DeviceInformationChangeImpl } from './DeviceInformationChange';
import { OutOfBandOperationImpl } from './outOfBand/OutOfBandOperation';
import { OutOfBandPayloadDecodeImpl } from './outOfBand/OutOfBandPayloadDecode';
import { PinChangeImpl } from './pin/PinChange';
import { RegistrationImpl } from './Registration';

/**
 * The interface used to obtain operation objects (registration, deregistration, authentication...).
 *
 * @see {@link MobileAuthenticationClient.operations}
 */
export class Operations {}
export class OperationsImpl extends Operations {
  outOfBandOperation = new OutOfBandOperationImpl();
  outOfBandPayloadDecode = new OutOfBandPayloadDecodeImpl();
  registration = new RegistrationImpl();
  authCloudApiRegistration = new AuthCloudApiRegistrationImpl();
  authentication = new AuthenticationImpl();
  deregistration = new DeregistrationImpl();
  deviceInformationChange = new DeviceInformationChangeImpl();
  pinChange = new PinChangeImpl();
}
//# sourceMappingURL=Operations.js.map