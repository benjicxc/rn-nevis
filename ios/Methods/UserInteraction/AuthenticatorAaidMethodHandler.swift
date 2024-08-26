//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct AuthenticatorAaidMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: AuthenticatorAaidMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? SelectAuthenticatorState else {
			throw PluginError.illegalState("Select Authenticator state is expected!")
		}

		state.handler?.aaid(message.aaid)
		MethodChannelHandler.shared.resolve(method: .authenticatorAaid, message: nil)
	}
}
