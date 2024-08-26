//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct DeregistrationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: DeregistrationMessage = try validate(message: message)
		let operation = DeregistrationOperation(operationId: message.operationId)
		OperationCache.shared.put(operation, using: message.operationId)

		let deregistration = client.operations.deregistration
		if let username = message.username {
			deregistration.username(username)
		}

		if let aaid = message.aaid {
			deregistration.aaid(aaid)
		}

		if let typedAuthorizationProvider = message.authorizationProvider {
			deregistration.authorizationProvider(typedAuthorizationProvider.wrapped)
		}

		if let requestHeaders = message.requestHeaders {
			deregistration.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.onSuccessProvided {
			deregistration.onSuccess(operation.onSuccess)
		}

		if message.onErrorProvided {
			deregistration.onError(operation.onError)
		}

		deregistration.execute()
	}
}
