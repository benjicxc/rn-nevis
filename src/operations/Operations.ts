/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { AuthCloudApiRegistration, AuthCloudApiRegistrationImpl } from './AuthCloudApiRegistration';
import { Authentication, AuthenticationImpl } from './Authentication';
import { Deregistration, DeregistrationImpl } from './Deregistration';
import { DeviceInformationChange, DeviceInformationChangeImpl } from './DeviceInformationChange';
import { OutOfBandOperation, OutOfBandOperationImpl } from './outOfBand/OutOfBandOperation';
import {
	OutOfBandPayloadDecode,
	OutOfBandPayloadDecodeImpl,
} from './outOfBand/OutOfBandPayloadDecode';
import { PinChange, PinChangeImpl } from './pin/PinChange';
import { Registration, RegistrationImpl } from './Registration';

/**
 * The interface used to obtain operation objects (registration, deregistration, authentication...).
 *
 * @see {@link MobileAuthenticationClient.operations}
 */
export abstract class Operations {
	/**
	 * Returns an {@link OutOfBandOperation} object.
	 *
	 * The object can be used to process an {@link OutOfBandPayload} that was obtained from a QR code or
	 * an Intent (push message for example).
	 */
	abstract outOfBandOperation: OutOfBandOperation;
	/**
	 * Returns an {@link OutOfBandPayloadDecode} object.
	 *
	 * The object can be used to decode an {@link OutOfBandPayload} from a String in JSON format.
	 */
	abstract outOfBandPayloadDecode: OutOfBandPayloadDecode;

	/**
	 * Returns a {@link Registration} object.
	 *
	 * The object can be used to register a new authenticator.
	 */
	abstract registration: Registration;

	/**
	 * Returns an {@link AuthCloudApiRegistration} object.
	 *
	 * The object can be used to register a new authenticator when using the Nevis Auth Cloud
	 * enroll API.
	 */
	abstract authCloudApiRegistration: AuthCloudApiRegistration;

	/**
	 * Returns an {@link Authentication} object.
	 *
	 * The object can be used to authenticate using an already registered authenticator.
	 */
	abstract authentication: Authentication;

	/**
	 * Returns a {@link Deregistration} object.
	 *
	 * The object can be used to deregister authenticators.
	 */
	abstract deregistration: Deregistration;

	/**
	 * Returns a {@link DeviceInformationChange} object.
	 *
	 * The object can be used to update the device information.
	 */
	abstract deviceInformationChange: DeviceInformationChange;

	/**
	 * Returns a {@link PinChange} object.
	 *
	 * The object can be used to change the PIN of a user.
	 */
	abstract pinChange: PinChange;
}

export class OperationsImpl extends Operations {
	outOfBandOperation: OutOfBandOperation = new OutOfBandOperationImpl();
	outOfBandPayloadDecode: OutOfBandPayloadDecode = new OutOfBandPayloadDecodeImpl();
	registration: Registration = new RegistrationImpl();
	authCloudApiRegistration: AuthCloudApiRegistration = new AuthCloudApiRegistrationImpl();
	authentication: Authentication = new AuthenticationImpl();
	deregistration: Deregistration = new DeregistrationImpl();
	deviceInformationChange: DeviceInformationChange = new DeviceInformationChangeImpl();
	pinChange: PinChange = new PinChangeImpl();
}
