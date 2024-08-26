//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class UserInteractionOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: (AuthorizationProvider?) -> ()
	var pinEnroller: PinEnroller
	let authenticatorSelector: AuthenticatorSelector
	let accountSelector: AccountSelector
	let biometricUserVerifier: BiometricUserVerifier
	let devicePasscodeUserVerifier: DevicePasscodeUserVerifier
	let pinUserVerifier: PinUserVerifier

	// MARK: Initialization

	init(operationId: String, method: ReactMethod) {
		self.pinEnroller = PinEnrollerImpl(operationId: operationId, pinPolicy: nil)
		self.authenticatorSelector = AuthenticatorSelectorImpl(operationId: operationId)
		self.accountSelector = AccountSelectorImpl(operationId: operationId)
		self.biometricUserVerifier = BiometricUserVerifierImpl(operationId: operationId)
		self.devicePasscodeUserVerifier = DevicePasscodeUserVerifierImpl(operationId: operationId)
		self.pinUserVerifier = PinUserVerifierImpl(operationId: operationId)
		self.state = NoOperationState()
		self.onSuccess = {
			OnSuccessImpl(operationId: operationId, method: method).onSuccess(authorizationProvider: $0)
		}
		self.onError = { OnErrorImpl(operationId: operationId, method: method).onError($0) }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}

	// MARK: Public Interface

	func update(state: UserInteractionState) -> UserInteractionOperation {
		self.state = state
		return self
	}
}

// MARK: -

class OutOfBandRegistrationOperation: UserInteractionOperation {
	// MARK: Properties

	var registration: OutOfBandRegistration

	// MARK: Initialization

	init(operationId: String, registration: OutOfBandRegistration) {
		self.registration = registration
		super.init(operationId: operationId, method: .oobRegister)
	}

	// MARK: Public Interface

	@discardableResult
	func update(operationId: String, pinPolicy: PinPolicy?) -> OutOfBandRegistrationOperation {
		pinEnroller = PinEnrollerImpl(operationId: operationId, pinPolicy: pinPolicy)
		return self
	}
}

// MARK: -

class OutOfBandAuthenticationOperation: UserInteractionOperation {
	// MARK: Properties

	var authentication: OutOfBandAuthentication

	// MARK: Initialization

	init(operationId: String, authentication: OutOfBandAuthentication) {
		self.authentication = authentication
		super.init(operationId: operationId, method: .oobAuthenticate)
	}
}

// MARK: -

class RegistrationOperation: UserInteractionOperation {
	// MARK: Initialization

	init(operationId: String, pinPolicy: PinPolicy?) {
		super.init(operationId: operationId, method: .register)
		pinEnroller = PinEnrollerImpl(operationId: operationId, pinPolicy: pinPolicy)
	}
}

// MARK: -

class AuthCloudApiRegistrationOperation: UserInteractionOperation {
	// MARK: Initialization

	init(operationId: String, pinPolicy: PinPolicy?) {
		super.init(operationId: operationId, method: .authCloudApiRegister)
		pinEnroller = PinEnrollerImpl(operationId: operationId, pinPolicy: pinPolicy)
	}
}

// MARK: -

class AuthenticationOperation: UserInteractionOperation {}
