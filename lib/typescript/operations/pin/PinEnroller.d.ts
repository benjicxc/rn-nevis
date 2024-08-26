/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
import type { PinEnrollmentContext } from './PinEnrollmentContext';
import type { PinEnrollmentHandler } from './PinEnrollmentHandler';
import { PinPolicyProvider } from './PinPolicyProvider';
/**
 * The object in charge of PIN enrollment.
 *
 * The SDK does not provide implementations of this interface.
 * The implementation must be done by the user of the SDK.
 *
 * @see
 * - {@link Registration.pinEnroller}
 * - {@link AuthCloudApiRegistration.pinEnroller}
 * - {@link OutOfBandRegistration.pinEnroller}
 */
export declare abstract class PinEnroller extends PinPolicyProvider {
    /**
     * The method that will be invoked till either the user provides a PIN that conforms to the format
     * expected by the SDK (i.e. a 6 digit PIN) or till the operation is cancelled (through the
     * {@link PinEnrollmentHandler.cancel}).
     *
     * @param context the object providing some contextual information during PIN enrollment.
     * @param handler the object that must be invoked with the new PIN.
     */
    abstract enrollPin(context: PinEnrollmentContext, handler: PinEnrollmentHandler): void;
    /**
     * This method is invoked when valid PIN credentials were provided during registration.
     *
     * This method can be used for instance to hide the UI used to ask for credentials to the user
     * (some text fields to get PIN credentials) and then display some progress message indicating
     * that the operation is ongoing.
     *
     * Note that invoking this method does not mean that the registration completed successfully
     * (this is notified through `onSuccess` methods once the FIDO UAF server validates the request
     * generated with the credentials).
     */
    abstract onValidCredentialsProvided(): void;
}
//# sourceMappingURL=PinEnroller.d.ts.map