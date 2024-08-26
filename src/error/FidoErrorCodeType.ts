/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * Collection error codes based on the {@link https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-client-api-transport-v1.1-ps-20170202.html#errorcode-interface | FIDO UAF client error codes}.
 */
export enum FidoErrorCodeType {
	/**
	 * The operation completed with no error condition encountered.
	 */
	NoError = 'NO_ERROR',

	/**
	 * Waiting on user action to proceed. For example, selecting an authenticator in the FIDO UAF client
	 * user interface, performing user verification, or completing an enrollment step with an authenticator.
	 */
	WaitUserAction = 'WAIT_USER_ACTION',

	/**
	 * window.location.protocol is not "https" or the DOM contains insecure mixed content.
	 */
	InsecureTransport = 'INSECURE_TRANSPORT',

	/**
	 * The user declined any necessary part of the interaction to complete the registration.
	 */
	UserCanceled = 'USER_CANCELED',

	/**
	 * The UAFMessage does not specify a protocol version supported by this FIDO UAF Client.
	 */
	UnsupportedVersion = 'UNSUPPORTED_VERSION',

	/**
	 * No authenticator matching the authenticator policy specified in the UAFMessage is available to
	 * service the request, or the user declined to consent to the use of a suitable authenticator.
	 */
	NoSuitableAuthenticator = 'NO_SUITABLE_AUTHENTICATOR',

	/**
	 * A violation of the UAF protocol occurred. The interaction may have timed out; the origin associated
	 * with the message may not match the origin of the calling DOM context, or the protocol message may be
	 * malformed or tampered with.
	 */
	ProtocolError = 'PROTOCOL_ERROR',

	/**
	 * The client declined to process the operation because the caller's calculated facet identifier
	 * was not found in the trusted list for the application identifier specified in the request message.
	 *
	 * <p>This error occurs typically when there is a misconfiguration of the server: the facets defined
	 * by the FIDO UAF server do not match the configuration of the application.
	 */
	UntrustedFacetId = 'UNTRUSTED_FACET_ID',

	/**
	 * The UAuth key disappeared from the authenticator and cannot be restored.
	 *
	 * This is a non-recoverable error: the existing credentials are not valid anymore. They should be
	 * removed from the server and a new authenticator must be registered to authenticate again.
	 */
	KeyDisappearedPermanently = 'KEY_DISAPPEARED_PERMANENTLY',

	/**
	 * The authenticator denied access to the resulting request.
	 */
	AuthenticatorAccessDenied = 'AUTHENTICATOR_ACCESS_DENIED',

	/**
	 * Transaction content cannot be rendered, e.g. format doesn't fit authenticator's need.
	 * Note: The transaction content format requirements are specified in the authenticator's metadata
	 * statement.
	 */
	InvalidTransactionContent = 'INVALID_TRANSACTION_CONTENT',

	/**
	 * The user took too long to follow an instruction, e.g. didn't swipe the finger within the accepted time.
	 */
	UserNotResponsive = 'USER_NOT_RESPONSIVE',

	/**
	 * Insufficient resources in the authenticator to perform the requested task.
	 */
	InsufficientAuthenticatorResources = 'INSUFFICIENT_AUTHENTICATOR_RESOURCES',

	/**
	 * The operation failed because the user is locked out and the authenticator cannot automatically
	 * trigger an action to change that.
	 * For example, an authenticator could allow the user to enter an alternative password to re-enable
	 * the use of fingerprints after too many failed finger verification attempts. This error will be
	 * reported if such method either does not exist or the ASM / authenticator cannot automatically trigger it.
	 */
	UserLockout = 'USER_LOCKOUT',

	/**
	 * The operation failed because the user is not enrolled to the authenticator and the authenticator
	 * cannot automatically * trigger user enrollment.
	 */
	UserNotEnrolled = 'USER_NOT_ENROLLED',

	/**
	 * An error condition not described by the above-listed codes.
	 */
	Unknown = 'UNKNOWN',
}
