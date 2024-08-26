//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct AccountUsernameMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: AccountUsernameMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? SelectAccountState else {
			throw PluginError.illegalState("Select Account state is expected!")
		}

		state.handler?.username(message.username)
	}
}
