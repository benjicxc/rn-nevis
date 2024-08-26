//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct PinEnrollMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: PinEnrollMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? EnrollPinState else {
			throw PluginError.illegalState("Enroll Pin state is expected!")
		}

		state.handler?.pin(message.pin)
		MethodChannelHandler.shared.resolve(method: .pinEnroll, message: nil)
	}
}
