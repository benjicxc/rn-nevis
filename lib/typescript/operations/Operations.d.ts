/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { AuthCloudApiRegistration } from './AuthCloudApiRegistration';
import { Authentication } from './Authentication';
import { Deregistration } from './Deregistration';
import { DeviceInformationChange } from './DeviceInformationChange';
import { OutOfBandOperation } from './outOfBand/OutOfBandOperation';
import { OutOfBandPayloadDecode } from './outOfBand/OutOfBandPayloadDecode';
import { PinChange } from './pin/PinChange';
import { Registration } from './Registration';
/**
 * The interface used to obtain operation objects (registration, deregistration, authentication...).
 *
 * @see {@link MobileAuthenticationClient.operations}
 */
export declare abstract class Operations {
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
export declare class OperationsImpl extends Operations {
    outOfBandOperation: OutOfBandOperation;
    outOfBandPayloadDecode: OutOfBandPayloadDecode;
    registration: Registration;
    authCloudApiRegistration: AuthCloudApiRegistration;
    authentication: Authentication;
    deregistration: Deregistration;
    deviceInformationChange: DeviceInformationChange;
    pinChange: PinChange;
}
//# sourceMappingURL=Operations.d.ts.map