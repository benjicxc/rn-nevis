//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class DeviceInformationChangeOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: () -> ()

	// MARK: Initialization

	init(operationId: String) {
		self.state = NoOperationState()
		self.onSuccess = { OnSuccessImpl(operationId: operationId, method: .deviceInformationChange).onSuccess() }
		self.onError = { OnErrorImpl(operationId: operationId, method: .deviceInformationChange).onError($0) }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}
}
