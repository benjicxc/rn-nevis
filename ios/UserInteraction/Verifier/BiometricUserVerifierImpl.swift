//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class BiometricUserVerifierImpl {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}

// MARK: - BiometricUserVerifier

extension BiometricUserVerifierImpl: BiometricUserVerifier {
	func verifyBiometric(context: BiometricUserVerificationContext, handler: BiometricUserVerificationHandler) {
		do {
			let operation: UserInteractionOperation = try OperationCache.shared.read(by: operationId)
			let state = VerifyUserState(verificationMode: .biometric,
			                            context: context,
			                            biometricUserVerificationHandler: handler)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = UserVerifierMessage(operationId: operationId,
			                                  context: context)
			EventEmitter.shared.dispatch(event: .verifyUser, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to verify biometric! Error: \(error.localizedDescription)")
		}
	}
}
