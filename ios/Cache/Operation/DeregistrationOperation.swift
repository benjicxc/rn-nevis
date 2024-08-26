//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class DeregistrationOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: () -> ()

	// MARK: Initialization

	init(operationId: String) {
		self.state = NoOperationState()
		self.onError = { OnErrorImpl(operationId: operationId, method: .deregister).onError($0) }
		self.onSuccess = { OnSuccessImpl(operationId: operationId, method: .deregister).onSuccess() }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}

	// MARK: Public Interface

	func update(state: UserInteractionState) -> DeregistrationOperation {
		self.state = state
		return self
	}
}
