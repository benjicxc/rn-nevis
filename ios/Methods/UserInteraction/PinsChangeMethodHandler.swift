//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct PinsChangeMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: PinsChangeMessage = try validate(message: message)
		let operation: PinChangeOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? PinChange else {
			throw PluginError.illegalState("Pin change state is expected!")
		}

		state.handler?.pins(message.oldPin, message.newPin)
		
		MethodChannelHandler.shared.resolve(method: .pinsChange, message: nil)
	}
}
