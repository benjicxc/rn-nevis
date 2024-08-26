//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct LocalAccountsMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let resultMessage = LocalAccountsOutMessage(operationId: message.operationId,
													   accounts: client.localData.accounts)
		MethodChannelHandler.shared.resolve(method: .localAccounts, message: resultMessage)
	}
}
