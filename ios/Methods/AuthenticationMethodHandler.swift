//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct AuthenticationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: AuthenticationMessage = try validate(message: message)
		let operation = AuthenticationOperation(operationId: message.operationId, method: .authenticate)
		OperationCache.shared.put(operation, using: message.operationId)

		let authentication = client.operations.authentication
		if let username = message.username {
			authentication.username(username)
		}

		if let typedSessionProvider = message.sessionProvider {
			authentication.sessionProvider(typedSessionProvider.wrapped)
		}

		if let retryPolicy = message.retryPolicy {
			authentication.retryPolicyObtainingAuthorizationProvider(retryPolicy.wrapped)
		}

		if let requestHeaders = message.requestHeaders {
			authentication.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.authenticatorSelectorProvided {
			authentication.authenticatorSelector(operation.authenticatorSelector)
		}
		
		if message.pinUserVerifierProvided {
			authentication.pinUserVerifier(operation.pinUserVerifier)
		}

		if message.biometricUserVerifierProvided {
			authentication.biometricUserVerifier(operation.biometricUserVerifier)
		}

		if message.devicePasscodeUserVerifierProvided {
			authentication.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
		}

		if message.onSuccessProvided {
			authentication.onSuccess { operation.onSuccess($0) }
		}

		if message.onErrorProvided {
			authentication.onError(operation.onError)
		}

		authentication.execute()
	}
}
