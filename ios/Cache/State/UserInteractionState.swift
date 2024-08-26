//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class UserInteractionState: OperationState {
	// MARK: OperationState

	func cancel() {
		fatalError("Must override.")
	}

	// MARK: Public Interface

	func isPolicyCompliant(aaid _: String, for _: String?) -> Bool {
		fatalError("isPolicyCompliant cannot be called in the current state!")
	}
}

// MARK: -

class SelectAccountState: UserInteractionState {
	// MARK: Properties

	let context: AccountSelectionContext?
	let handler: AccountSelectionHandler?

	// MARK: Initialization

	init(context: AccountSelectionContext?, handler: AccountSelectionHandler?) {
		self.context = context
		self.handler = handler
	}

	// MARK: UserInteractionState Overrides

	override func cancel() {
		handler?.cancel()
	}

	override func isPolicyCompliant(aaid: String, for username: String?) -> Bool {
		guard let username else { return false }
		return context?.isPolicyCompliant(username: username, aaid: aaid) ?? false
	}
}

// MARK: -

class SelectAuthenticatorState: UserInteractionState {
	// MARK: Properties

	let context: AuthenticatorSelectionContext?
	let handler: AuthenticatorSelectionHandler?

	// MARK: Initialization

	init(context: AuthenticatorSelectionContext?, handler: AuthenticatorSelectionHandler?) {
		self.context = context
		self.handler = handler
	}

	// MARK: UserInteractionState Overrides

	override func cancel() {
		handler?.cancel()
	}

	override func isPolicyCompliant(aaid: String, for _: String?) -> Bool {
		context?.isPolicyCompliant(authenticatorAaid: aaid) ?? false
	}
}

// MARK: -

class EnrollPinState: UserInteractionState {
	// MARK: Properties

	let context: PinEnrollmentContext?
	let handler: PinEnrollmentHandler?
	let authenticator: any Authenticator

	// MARK: Initialization

	init(context: PinEnrollmentContext?, handler: PinEnrollmentHandler? = nil, authenticator: any Authenticator) {
		self.context = context
		self.handler = handler
		self.authenticator = authenticator
	}

	// MARK: UserInteractionState Overrides

	override func cancel() {
		handler?.cancel()
	}
}

// MARK: -

enum VerificationMode {
	case pin, biometric, devicePasscode
}

// MARK: -

class VerifyUserState: UserInteractionState {
	// MARK: Properties

	let verificationMode: VerificationMode
	let context: UserVerificationContext?
	let pinUserVerificationHandler: PinUserVerificationHandler?
	let biometricUserVerificationHandler: BiometricUserVerificationHandler?
	let devicePasscodeUserVerificationHandler: DevicePasscodeUserVerificationHandler?

	// MARK: Initialization

	init(verificationMode: VerificationMode,
		 context: UserVerificationContext?,
		 pinUserVerificationHandler: PinUserVerificationHandler? = nil,
		 biometricUserVerificationHandler: BiometricUserVerificationHandler? = nil,
		 devicePasscodeUserVerificationHandler: DevicePasscodeUserVerificationHandler? = nil)
	{
		self.verificationMode = verificationMode
		self.context = context
		self.pinUserVerificationHandler = pinUserVerificationHandler
		self.biometricUserVerificationHandler = biometricUserVerificationHandler
		self.devicePasscodeUserVerificationHandler = devicePasscodeUserVerificationHandler
	}

	func verify(pin: String) {
		switch verificationMode {
		case .pin:
			pinUserVerificationHandler?.verify(pin)
		case .biometric, .devicePasscode:
			fatalError("Cannot use pin verification during biometric verification!")
		}
	}

	// MARK: UserInteractionState Overrides

	override func cancel() {
		switch verificationMode {
		case .pin:
			pinUserVerificationHandler?.cancel()
		case .biometric:
			biometricUserVerificationHandler?.cancel()
		case .devicePasscode:
			devicePasscodeUserVerificationHandler?.cancel()
		}
	}
}

// MARK: -

class OnValidCredentialsProvidedState: UserInteractionState {
	// MARK: Properties

	let authenticator: any Authenticator

	// MARK: Initialization

	init(authenticator: any Authenticator) {
		self.authenticator = authenticator
	}
}
