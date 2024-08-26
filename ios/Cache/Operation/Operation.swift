//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

typealias ErrorHandler = (MobileAuthenticationClientError) -> ()

protocol Operation {
	var state: OperationState { get }
	var onError: ErrorHandler { get }

	func cancel()
}
