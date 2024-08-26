//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class AccountSelectorImpl {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}

// MARK: - AccountSelector

extension AccountSelectorImpl: AccountSelector {
	func selectAccount(context: AccountSelectionContext, handler: AccountSelectionHandler) {
		do {
			let operation: UserInteractionOperation = try OperationCache.shared.read(by: operationId)
			let state = SelectAccountState(context: context, handler: handler)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = AccountSelectorMessage(operationId: operationId,
			                                     context: context)
			EventEmitter.shared.dispatch(event: .selectAccount, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to select account! Error: \(error.localizedDescription)")
		}
	}
}
