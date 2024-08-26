//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

typealias ClientInitializerHandler = (MobileAuthenticationClient) -> ()

struct InitClientMethodHandler {
	func execute(with message: ChannelInMessage, completion handler: @escaping ClientInitializerHandler) throws {
		guard let message = message as? InitClientMessage else {
			throw PluginError.illegalArgument("Wrong type of message received!")
		}

		let operation = InitializationOperation(operationId: message.operationId)
		OperationCache.shared.put(operation, using: message.operationId)

		let clientInitializer = MobileAuthenticationClientInitializer()
		if let configuration = message.configuration {
			clientInitializer.configuration(configuration)
		}

		if message.onSuccessProvided {
			clientInitializer.onSuccess { client in
				handler(client)
				operation.onSuccess()
			}
		}

		if message.onErrorProvided {
			clientInitializer.onError(operation.onError)
		}

		clientInitializer.execute()
	}
}
