//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OutOfBandPayloadDecodeOperation: Operation {
	// MARK: Properties

	var state: OperationState
	var onError: ErrorHandler
	let onSuccess: (OutOfBandPayload) -> ()

	// MARK: Initialization

	init(operationId: String) {
		self.state = NoOperationState()
		self.onSuccess = {
			OnSuccessImpl(operationId: operationId, method: .payloadDecode).onSuccess(payload: $0)
		}

		self.onError = { OnErrorImpl(operationId: operationId, method: .payloadDecode).onError($0) }
	}

	// MARK: Operation

	func cancel() {
		state.cancel()
	}
}
