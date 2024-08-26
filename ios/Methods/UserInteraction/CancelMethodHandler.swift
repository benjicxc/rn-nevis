//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct CancelMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: CancelMessage = try validate(message: message)
		OperationCache.shared.cancel(by: message.operationId)
		MethodChannelHandler.shared.resolve(method: .cancel, message: nil)
	}
}
