//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

typealias OOBRegistrationHandler = (OutOfBandRegistration) -> ()
typealias OOBAuthenticationHandler = (OutOfBandAuthentication) -> ()

struct OutOfBandOperationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: OutOfBandOperationMessage = try validate(message: message)
		let operation = OutOfBandOperation(operationId: message.operationId)
		OperationCache.shared.put(operation, using: message.operationId)

		let outOfBandOperation = client.operations.outOfBandOperation
		if let payload = message.payload {
			outOfBandOperation.payload(payload)
		}

		if let requestHeaders = message.requestHeaders {
			outOfBandOperation.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.onRegistrationProvided {
			outOfBandOperation.onRegistration(register(using: message.operationId,
													   subOperationId: message.subOperationId))
		}

		if message.onAuthenticationProvided {
			outOfBandOperation.onAuthentication(authenticate(using: message.operationId,
															 subOperationId: message.subOperationId))
		}

		if message.onErrorProvided {
			outOfBandOperation.onError(operation.onError)
		}

		outOfBandOperation.execute()
	}
}

private extension OutOfBandOperationMethodHandler {
	func register(using operationId: String, subOperationId: String) -> OOBRegistrationHandler {
		{ registration in
			self.selectOperation(using: operationId, type: .registration)
			let operation = OutOfBandRegistrationOperation(operationId: subOperationId,
			                                               registration: registration)
			OperationCache.shared.put(operation, using: subOperationId)
		}
	}

	func authenticate(using operationId: String, subOperationId: String) -> OOBAuthenticationHandler {
		{ authentication in
			self.selectOperation(using: operationId, type: .authentication)
			let operation = OutOfBandAuthenticationOperation(operationId: subOperationId,
			                                                 authentication: authentication)
			OperationCache.shared.put(operation, using: subOperationId)
		}
	}

	func selectOperation(using operationId: String, type: OperationType) {
		let message = OperationTypeMessage(operationId: operationId,
		                                   operationType: type)
		EventEmitter.shared.dispatch(event: .operationType, message: message)
	}
}
