//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinChangeOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: () -> ()
	let pinChanger: PinChanger

	// MARK: Initialization

	init(operationId: String, pinPolicy: PinPolicy?) {
		self.state = NoOperationState()
		self.onError = { OnErrorImpl(operationId: operationId, method: .pinChange).onError($0) }
		self.onSuccess = { OnSuccessImpl(operationId: operationId, method: .pinChange).onSuccess() }
		self.pinChanger = PinChangerImpl(operationId: operationId, pinPolicy: pinPolicy)
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}

	// MARK: Public Interface

	func update(state: PinChange) -> PinChangeOperation {
		self.state = state
		return self
	}
}
