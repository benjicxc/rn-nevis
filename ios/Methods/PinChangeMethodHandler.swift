//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct PinChangeMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: PinChangeMessage = try validate(message: message)
		let operation = PinChangeOperation(operationId: message.operationId,
		                                   pinPolicy: message.pinPolicy)
		OperationCache.shared.put(operation, using: message.operationId)

		let pinChange = client.operations.pinChange
		if let username = message.username {
			pinChange.username(username)
		}

		if message.pinChangerProvided {
			pinChange.pinChanger(operation.pinChanger)
		}

		if message.onSuccessProvided {
			pinChange.onSuccess(operation.onSuccess)
		}

		if message.onErrorProvided {
			pinChange.onError(operation.onError)
		}

		pinChange.execute()
	}
}
