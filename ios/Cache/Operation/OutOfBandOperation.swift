//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OutOfBandOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler

	// MARK: Initialization

	init(operationId: String) {
		self.state = NoOperationState()
		self.onError = { OnErrorImpl(operationId: operationId, method: .oobOperation).onError($0) }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}
}
