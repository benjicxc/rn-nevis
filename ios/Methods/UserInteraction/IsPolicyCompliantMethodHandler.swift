//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct IsPolicyCompliantMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: IsPolicyCompliantMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? UserInteractionState else {
			throw PluginError.illegalState("Select Account or Authenticator state is expected!")
		}

		let isPolicyCompliant = state.isPolicyCompliant(aaid: message.aaid,
		                                                for: message.username)
		let resultMessage = IsPolicyCompliantOutMessage(operationId: message.operationId, isPolicyCompliant: isPolicyCompliant)
		MethodChannelHandler.shared.resolve(method: .isPolicyCompliant, message: resultMessage)
	}
}
