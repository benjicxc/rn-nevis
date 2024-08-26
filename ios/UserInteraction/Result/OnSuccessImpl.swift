//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OnSuccessImpl {
	// MARK: Properties

	let operationId: String
	let method: ReactMethod

	// MARK: Initialization

	init(operationId: String, method: ReactMethod) {
		self.operationId = operationId
		self.method = method
	}
}

// MARK: - Public Interface

extension OnSuccessImpl {
	func onSuccess(authorizationProvider: AuthorizationProvider? = nil, payload: OutOfBandPayload? = nil) {
		let message = OnSuccessMessage(operationId: operationId,
									   authorizationProvider: authorizationProvider,
									   payload: payload)
		MethodChannelHandler.shared.resolve(method: method, message: message)
	}
}
