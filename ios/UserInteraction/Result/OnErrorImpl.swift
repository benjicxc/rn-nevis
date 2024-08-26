//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OnErrorImpl {
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

extension OnErrorImpl {
	func onError(_ error: MobileAuthenticationClientError?) {
		let message = ErrorMessage(operationId: operationId,
								   error: error)
		MethodChannelHandler.shared.reject(method: method, message: message)
	}
}
