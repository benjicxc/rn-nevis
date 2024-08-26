//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class InitializationOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: () -> ()

	// MARK: Initialization

	init(operationId: String) {
		self.state = NoOperationState()
		self.onSuccess = { OnSuccessImpl(operationId: operationId, method: .initClient).onSuccess() }
		self.onError = { OnErrorImpl(operationId: operationId, method: .initClient).onError($0) }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}
}
