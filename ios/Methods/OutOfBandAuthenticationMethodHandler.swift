//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct OutOfBandAuthenticationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: OutOfBandAuthenticationMessage = try validate(message: message)
		let operation: OutOfBandAuthenticationOperation = try OperationCache.shared.read(by: message.operationId)

		if let requestHeaders = message.requestHeaders {
			operation.authentication.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.accountSelectorProvided {
			operation.authentication.accountSelector(operation.accountSelector)
		}

		if message.authenticatorSelectorProvided {
			operation.authentication.authenticatorSelector(operation.authenticatorSelector)
		}

		if message.pinUserVerifierProvided {
			operation.authentication.pinUserVerifier(operation.pinUserVerifier)
		}

		if message.biometricUserVerifierProvided {
			operation.authentication.biometricUserVerifier(operation.biometricUserVerifier)
		}

        if message.devicePasscodeUserVerifierProvided {
            operation.authentication.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

		if message.onSuccessProvided {
			operation.authentication.onSuccess { operation.onSuccess($0) }
		}

		if message.onErrorProvided {
			operation.authentication.onError(operation.onError)
		}

		operation.authentication.execute()
		OperationCache.shared.put(operation, using: message.operationId)
	}
}
