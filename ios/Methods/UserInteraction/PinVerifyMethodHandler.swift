//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct PinVerifyMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: PinVerifyMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? VerifyUserState else {
			throw PluginError.illegalState("Verify User state is expected!")
		}

		state.verify(pin: message.pin)
		MethodChannelHandler.shared.resolve(method: .pinVerify, message: nil)
	}
}
