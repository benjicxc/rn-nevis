/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { HttpOperationMessage } from './HttpOperationMessage';
import { UserInteractionOperationMessage } from './UserInteractionOperationMessage';
import type { RequestHeaders } from '../../../operations/RequestHeaders';

/**
 * Holds the parameters of the out-of-band authentication operation call.
 */
export class OutOfBandAuthenticationMessage
	implements UserInteractionOperationMessage, HttpOperationMessage
{
	/**
	 * The identifier of the operation.
	 */
	operationId: string;

	/**
	 * Flag that tells whether the account selector is provided.
	 */
	accountSelectorProvided: boolean;

	/**
	 * Flag that tells whether the authenticator selector is provided.
	 */
	authenticatorSelectorProvided: boolean;

	/**
	 * Flag that tells whether the PIN enroller is provided.
	 */
	pinEnrollerProvided: boolean;

	/**
	 * Flag that tells whether the PIN user verifier is provided.
	 */
	pinUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the biometric user verifier is provided.
	 */
	biometricUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the device passcode user verifier is provided.
	 */
	devicePasscodeUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the fingerprint user verifier is provided.
	 */
	fingerprintUserVerifierProvided: boolean;

	/**
	 * Flag that tells whether the success callback is provided.
	 */
	onSuccessProvided: boolean;

	/**
	 * Flag that tells whether the error callback is provided.
	 */
	onErrorProvided: boolean;

	/**
	 * Specifies the additional request headers that must be included in the HTTP requests sent by
	 * the operation.
	 */
	requestHeaders?: RequestHeaders;

	/**
	 * Creates a new instance.
	 *
	 * @param operationId the identifier of the operation.
	 * @param accountSelectorProvided flag that tells whether the account selector is provided.
	 * @param authenticatorSelectorProvided flag that tells whether the authenticator selector is provided.
	 * @param pinEnrollerProvided flag that tells whether the PIN enroller is provided.
	 * @param pinUserVerifierProvided flag that tells whether the PIN user verifier is provided.
	 * @param biometricUserVerifierProvided flag that tells whether the biometric user verifier is
	 * provided.
	 * @param devicePasscodeUserVerifierProvided flag that tells whether the device passcode user
	 * verifier is provided.
	 * @param fingerprintUserVerifierProvided flag that tells whether the fingerprint user verifier
	 * is provided.
	 * @param onSuccessProvided flag that tells whether the success callback is provided.
	 * @param onErrorProvided flag that tells whether the error callback is provided.
	 * @param requestHeaders specifies the additional request headers that must be included in the
	 * HTTP requests sent by the operation.
	 */
	constructor(
		operationId: string,
		accountSelectorProvided: boolean,
		authenticatorSelectorProvided: boolean,
		pinEnrollerProvided: boolean,
		pinUserVerifierProvided: boolean,
		biometricUserVerifierProvided: boolean,
		devicePasscodeUserVerifierProvided: boolean,
		fingerprintUserVerifierProvided: boolean,
		onSuccessProvided: boolean,
		onErrorProvided: boolean,
		requestHeaders?: RequestHeaders
	) {
		this.operationId = operationId;
		this.accountSelectorProvided = accountSelectorProvided;
		this.authenticatorSelectorProvided = authenticatorSelectorProvided;
		this.pinEnrollerProvided = pinEnrollerProvided;
		this.pinUserVerifierProvided = pinUserVerifierProvided;
		this.biometricUserVerifierProvided = biometricUserVerifierProvided;
		this.devicePasscodeUserVerifierProvided = devicePasscodeUserVerifierProvided;
		this.fingerprintUserVerifierProvided = fingerprintUserVerifierProvided;
		this.onSuccessProvided = onSuccessProvided;
		this.onErrorProvided = onErrorProvided;
		this.requestHeaders = requestHeaders;
	}
}
