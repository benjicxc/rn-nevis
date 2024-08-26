//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinEnrollerImpl {
	// MARK: Properties

	let operationId: String
	let policy: PinPolicy?

	// MARK: Initialization

	init(operationId: String, pinPolicy: PinPolicy?) {
		self.operationId = operationId
		self.policy = pinPolicy
	}
}

// MARK: - PinEnroller

extension PinEnrollerImpl: PinEnroller {
	func enrollPin(context: PinEnrollmentContext, handler: PinEnrollmentHandler) {
		do {
			let operation: UserInteractionOperation = try OperationCache.shared.read(by: operationId)
			let authenticator = try findPinAuthenticator(using: operation)
			let state = EnrollPinState(context: context,
			                           handler: handler,
			                           authenticator: authenticator)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = PinEnrollerMessage(operationId: operationId,
			                                 context: context)
			EventEmitter.shared.dispatch(event: .pinEnroll, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to enroll pin! Error: \(error.localizedDescription)")
		}
	}

	func pinPolicy() -> PinPolicy {
		policy ?? PinPolicy()
	}
}

private extension PinEnrollerImpl {
	func findPinAuthenticator(using operation: UserInteractionOperation) throws -> any Authenticator {
		if let previousState = operation.state as? SelectAuthenticatorState,
		   let authenticator = previousState.context?.authenticators.first(where: { $0.aaid == AuthenticatorAaid.Pin.rawValue })
		{
			return authenticator
		}

		if let previousState = operation.state as? EnrollPinState {
			return previousState.authenticator
		}

		throw PluginError.illegalState("Pin authenticator is missing!")
	}
}
