//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinUserVerifierImpl {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}

// MARK: - PinUserVerifier

extension PinUserVerifierImpl: PinUserVerifier {
	func verifyPin(context: PinUserVerificationContext, handler: PinUserVerificationHandler) {
		do {
			let operation: UserInteractionOperation = try OperationCache.shared.read(by: operationId)
			let state = VerifyUserState(verificationMode: .pin,
			                            context: context,
			                            pinUserVerificationHandler: handler)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = UserVerifierMessage(operationId: operationId,
			                                  context: context)
			EventEmitter.shared.dispatch(event: .verifyUser, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to verify pin! Error: \(error.localizedDescription)")
		}
	}
}
