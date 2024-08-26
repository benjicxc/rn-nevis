//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class AuthenticatorSelectorImpl {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}

// MARK: - AuthenticatorSelector

extension AuthenticatorSelectorImpl: AuthenticatorSelector {
	func selectAuthenticator(context: AuthenticatorSelectionContext, handler: AuthenticatorSelectionHandler) {
		do {
			let operation: UserInteractionOperation = try OperationCache.shared.read(by: operationId)
			let state = SelectAuthenticatorState(context: context, handler: handler)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = AuthenticatorSelectorMessage(operationId: operationId,
			                                           context: context)
			EventEmitter.shared.dispatch(event: .selectAuthenticator, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to select authenticator! Error: \(error.localizedDescription)")
		}
	}
}
