/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { PlatformOperation } from './PlatformOperation';
import { Aaid } from '../../localData/Aaid';
import { Authenticator } from '../../localData/Authenticator';
import { PinChangeContext } from '../../operations/pin/PinChangeContext';
import { PinChangeHandler, PinChangeHandlerImpl } from '../../operations/pin/PinChangeHandler';
import { PinChanger } from '../../operations/pin/PinChanger';
import { PinEnroller } from '../../operations/pin/PinEnroller';
import type { PinEnrollmentContext } from '../../operations/pin/PinEnrollmentContext';
import {
	PinEnrollmentHandler,
	PinEnrollmentHandlerImpl,
} from '../../operations/pin/PinEnrollmentHandler';
import type { AccountSelectionContext } from '../../operations/selection/AccountSelectionContext';
import {
	AccountSelectionHandler,
	AccountSelectionHandlerImpl,
} from '../../operations/selection/AccountSelectionHandler';
import { AccountSelector } from '../../operations/selection/AccountSelector';
import type { AuthenticatorSelectionContext } from '../../operations/selection/AuthenticatorSelectionContext';
import {
	AuthenticatorSelectionHandler,
	AuthenticatorSelectionHandlerImpl,
} from '../../operations/selection/AuthenticatorSelectionHandler';
import { AuthenticatorSelector } from '../../operations/selection/AuthenticatorSelector';
import type { BiometricUserVerificationHandler } from '../../operations/userverification/BiometricUserVerificationHandler';
import { BiometricUserVerifier } from '../../operations/userverification/BiometricUserVerifier';
import type { DevicePasscodeUserVerificationHandler } from '../../operations/userverification/DevicePasscodeUserVerificationHandler';
import { DevicePasscodeUserVerifier } from '../../operations/userverification/DevicePasscodeUserVerifier';
import type { FingerprintUserVerificationHandler } from '../../operations/userverification/FingerprintUserVerificationHandler';
import { FingerprintUserVerifier } from '../../operations/userverification/FingerprintUserVerifier';
import type { PinUserVerificationContext } from '../../operations/userverification/PinUserVerificationContext';
import type { PinUserVerificationHandler } from '../../operations/userverification/PinUserVerificationHandler';
import { PinUserVerifier } from '../../operations/userverification/PinUserVerifier';
import type { UserVerificationContext } from '../../operations/userverification/UserVerificationContext';
import type { UserVerificationHandler } from '../../operations/userverification/UserVerificationHandler';

/**
 * Helps in following the states of user interaction operations during method
 * channel calls.
 */
export abstract class UserInteractionPlatformOperation extends PlatformOperation {
	/**
	 * The {@link AccountSelector} given when an operation is started.
	 *
	 * E.g.: During an out-of-band process.
	 */
	abstract accountSelector?: AccountSelector;

	/**
	 * The {@link AuthenticatorSelector} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract authenticatorSelector?: AuthenticatorSelector;

	/**
	 * The {@link PinEnroller} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract pinEnroller?: PinEnroller;

	/**
	 * The {@link PinUserVerifier} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract pinUserVerifier?: PinUserVerifier;

	/**
	 * The {@link PinChanger} given when an operation is started.
	 */
	abstract pinChanger?: PinChanger;

	/**
	 * The {@link BiometricUserVerifier} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract biometricUserVerifier?: BiometricUserVerifier;

	/**
	 * The {@link DevicePasscodeUserVerifier} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract devicePasscodeUserVerifier?: DevicePasscodeUserVerifier;

	/**
	 * The {@link FingerprintUserVerifier} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 */
	abstract fingerprintUserVerifier?: FingerprintUserVerifier;

	/**
	 * The {@link AccountSelectionHandler} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 * This is generated automatically based on the {@link operationId}.
	 */
	abstract accountSelectionHandler?: AccountSelectionHandler;

	/**
	 * The {@link AuthenticatorSelectionHandler} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 * This is generated automatically based on the {@link operationId}.
	 */
	abstract authenticatorSelectionHandler?: AuthenticatorSelectionHandler;

	/**
	 * The {@link PinEnrollmentHandler} given when an operation is started.
	 *
	 * Eg.: During an out-of-band process.
	 * This is generated automatically based on the {@link operationId}.
	 */
	abstract pinEnrollmentHandler?: PinEnrollmentHandler;

	/**
	 * The {@link PinChangeHandler} given when an operation is started.
	 *
	 * Eg.: During a pin change.
	 * This is generated automatically based on the {@link operationId}.
	 */
	abstract pinChangeHandler?: PinChangeHandler;

	/**
	 * The account selection interaction.
	 *
	 * The implementing class must ask the user to choose one of the accounts
	 * exposed by the {@link AccountSelectionContext} and provide the choice to the
	 * {@link AccountSelectionHandler}.
	 *
	 * @param context the object containing the list of existing accounts and authenticators.
	 */
	selectAccount(context: AccountSelectionContext): void {
		this.accountSelector?.selectAccount(context, this.accountSelectionHandler!);
	}

	/**
	 * The authenticator selection interaction.
	 *
	 * The implementing class must ask the user to choose one of the authenticators
	 * exposed by the {@link AuthenticatorSelectionContext} and provide the choice to the
	 * {@link AuthenticatorSelectionHandler}.
	 *
	 * Note, that in the case of transaction confirmation (which can be considered
	 * a special case of authentication) the implementing classes must present
	 * the contents of the transaction (if any) to the user for verification
	 * @see {@link AuthenticatorSelectionContext.transactionConfirmationData}
	 *
	 * @param context the object containing the list of existing authenticators.
	 */
	selectAuthenticator(context: AuthenticatorSelectionContext): void {
		this.authenticatorSelector?.selectAuthenticator(
			context,
			this.authenticatorSelectionHandler!
		);
	}

	/**
	 * The method that will be invoked till either the user provides a PIN that
	 * conforms to the format expected by the SDK (i.e. a 6 digit PIN) or till the
	 * operation is canceled (through the [PinEnrollmentHandler.cancel].
	 *
	 * @param context the context.
	 */
	enrollPin(context: PinEnrollmentContext): void {
		this.pinEnroller?.enrollPin(context, this.pinEnrollmentHandler!);
	}

	/**
	 * The user verification interaction.
	 *
	 * In the case of the registration the user must provide credentials again as
	 * required by the FIDO UAF protocol.
	 * In the case of the authentication, this is invoked for the user to provide
	 * credentials.
	 *
	 * If the user provided invalid credentials, and it results in a non-recoverable
	 * error, then `onSuccess` method will be invoked.
	 *
	 * @param context the object providing the information required for the verification
	 * process.
	 * @param handler the object that must be notified with the result of the interaction.
	 */
	verifyUser(context: UserVerificationContext, handler: UserVerificationHandler): Promise<void> {
		switch (context.authenticator.aaid) {
			case Aaid.PIN.rawValue():
				return this.pinUserVerifier!.verifyPin(
					context as PinUserVerificationContext,
					handler as PinUserVerificationHandler
				);
			case Aaid.BIOMETRIC.rawValue():
				return this.biometricUserVerifier!.verifyBiometric(
					context,
					handler as BiometricUserVerificationHandler
				);
			case Aaid.DEVICE_PASSCODE.rawValue():
				return this.devicePasscodeUserVerifier!.verifyDevicePasscode(
					context,
					handler as DevicePasscodeUserVerificationHandler
				);
			case Aaid.FINGERPRINT.rawValue():
				return this.fingerprintUserVerifier!.verifyFingerprint(
					context,
					handler as FingerprintUserVerificationHandler
				);
		}

		return Promise.reject(
			new Error(
				`No verifier found for Authenticator aaid ${context.authenticator.aaid} when verifying the user.`
			)
		);
	}

	/**
	 * This method is invoked when either valid local system credentials (biometric,
	 * fingerprint) or valid PIN credentials were provided and verified locally.
	 *
	 * This method can be used for instance to display some progress message
	 * indicating that the operation is ongoing.
	 *
	 * Note that invoking this method does not mean that the UAF operation completed
	 * successfully (this is notified through `onSuccess` methods once the FIDO UAF
	 * server validates the request generated with the credentials).
	 *
	 * @param authenticator the object describing the authenticator where credentials
	 * were validated.
	 */
	onValidCredentialsProvided(authenticator: Authenticator): void {
		switch (authenticator.aaid) {
			case Aaid.PIN.rawValue():
				return this.pinUserVerifier?.onValidCredentialsProvided();
			case Aaid.BIOMETRIC.rawValue():
				return this.biometricUserVerifier?.onValidCredentialsProvided();
			case Aaid.DEVICE_PASSCODE.rawValue():
				return this.devicePasscodeUserVerifier?.onValidCredentialsProvided();
			case Aaid.FINGERPRINT.rawValue():
				return this.fingerprintUserVerifier?.onValidCredentialsProvided();
		}
		throw new Error(
			`No verifier found for Authenticator aaid ${authenticator.aaid} when valid credentials provided.`
		);
	}

	/**
	 * The method that will be invoked till either the user provides the old PIN
	 * and a new PIN that conforms to the format expected by the SDK (i.e. a 6
	 * digit PIN), or till the operation is canceled (through the [PinChangeHandler.cancel]),
	 * or till the PIN authenticator is permanently locked because the user provided
	 * too many times an invalid PIN.
	 *
	 * @param context the context.
	 */
	changePin(context: PinChangeContext) {
		this.pinChanger?.changePin(context, this.pinChangeHandler!);
	}
}

export class UserInteractionPlatformOperationImpl extends UserInteractionPlatformOperation {
	operationId: string;
	authenticatorSelector?: AuthenticatorSelector;
	authenticatorSelectionHandler?: AuthenticatorSelectionHandler;
	accountSelector?: AccountSelector;
	accountSelectionHandler?: AccountSelectionHandler;
	biometricUserVerifier?: BiometricUserVerifier;
	devicePasscodeUserVerifier?: DevicePasscodeUserVerifier;
	fingerprintUserVerifier?: FingerprintUserVerifier;
	pinUserVerifier?: PinUserVerifier;
	pinChanger?: PinChanger;
	pinChangeHandler?: PinChangeHandler;
	pinEnroller?: PinEnroller;
	pinEnrollmentHandler?: PinEnrollmentHandler;

	constructor(
		operationId: string,
		authenticatorSelector?: AuthenticatorSelector,
		accountSelector?: AccountSelector,
		biometricUserVerifier?: BiometricUserVerifier,
		devicePasscodeUserVerifier?: DevicePasscodeUserVerifier,
		fingerprintUserVerifier?: FingerprintUserVerifier,
		pinUserVerifier?: PinUserVerifier,
		pinChanger?: PinChanger,
		pinEnroller?: PinEnroller
	) {
		super();
		this.operationId = operationId;
		this.authenticatorSelector = authenticatorSelector;
		this.accountSelector = accountSelector;
		this.biometricUserVerifier = biometricUserVerifier;
		this.devicePasscodeUserVerifier = devicePasscodeUserVerifier;
		this.fingerprintUserVerifier = fingerprintUserVerifier;
		this.pinUserVerifier = pinUserVerifier;
		this.pinChanger = pinChanger;
		this.pinEnroller = pinEnroller;
		this.accountSelectionHandler = new AccountSelectionHandlerImpl(operationId);
		this.authenticatorSelectionHandler = new AuthenticatorSelectionHandlerImpl(operationId);
		this.pinEnrollmentHandler = new PinEnrollmentHandlerImpl(operationId);
		this.pinChangeHandler = new PinChangeHandlerImpl(operationId);
	}
}
