/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import { RegistrationInfo } from './RegistrationInfo';
import { UserEnrollment } from './UserEnrollment';
/**
 * An object describing an authenticator.
 */
export declare abstract class Authenticator {
    /**
     * The "Authenticator Attestation ID" (AAID), which identifies the type and batch of the
     * authenticator.
     */
    abstract aaid: string;
    /**
     * The object containing the registration information of this `Authenticator`.
     */
    abstract registration: RegistrationInfo;
    /**
     * The user enrollment information.
     *
     * If this is an OS based authenticator (such as the fingerprint authenticator) the user
     * is enrolled when fingerprints are defined at the operating system level.
     *
     * If the authenticator is managed at the SDK level (PIN), the credentials are defined during
     * registration using a {@link PinEnroller}.
     *
     * If the user is not enrolled in a system managed authenticator (fingerprint, biometric), the
     * authenticator cannot be used to do a registration or an authentication.
     *
     * If an authenticator that is not supported is provided through {@link AuthenticatorSelector}
     * for registration or authentication operations, an {@link OperationError} will be returned
     * as a result of the operation.
     */
    abstract userEnrollment: UserEnrollment;
    /**
     * Returns whether the device has hardware supporting this authenticator or not. For example
     * if this is a fingerprint authenticator and the mobile device where the SDK is running does
     * not have a fingerprint sensor, this method will return `false`.
     *
     * If an authenticator that is not supported is provided through {@link AuthenticatorSelector}
     * for registration or authentication operations, an {@link OperationError} will be returned
     * as a result of the operation.
     */
    abstract isSupportedByHardware: boolean;
    /**
     * Alternate constructor that creates an {@link Authenticator} from a json.
     *
     * @param json contains the source for instance creation.
     * @returns an {@link Authenticator} instance.
     */
    static fromJson(json: any): Authenticator;
}
//# sourceMappingURL=Authenticator.d.ts.map