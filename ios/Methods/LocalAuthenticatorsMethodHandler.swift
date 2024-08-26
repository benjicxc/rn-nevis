//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct LocalAuthenticatorsMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let resultMessage = LocalAuthenticatorsOutMessage(operationId: message.operationId,
															 authenticators: client.localData.authenticators)
		MethodChannelHandler.shared.resolve(method: .localAuthenticators, message: resultMessage)
	}
}
