//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct RegistrationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: RegistrationMessage = try validate(message: message)
		let operation = RegistrationOperation(operationId: message.operationId,
		                                      pinPolicy: message.pinPolicy)
		OperationCache.shared.put(operation, using: message.operationId)
		let registration = client.operations.registration
		if let username = message.username {
			registration.username(username)
		}

		if let serverUrl = message.serverUrl, let url = URL(string: serverUrl) {
			registration.serverUrl(url)
		}

		if let deviceInformation = message.deviceInformation {
			registration.deviceInformation(deviceInformation)
		}

		if let typedAuthorizationProvider = message.authorizationProvider {
			registration.authorizationProvider(typedAuthorizationProvider.wrapped)
		}

		if let allowDevicePasscodeAsFallback = message.allowDevicePasscodeAsFallback {
			registration.allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback)
		}

		if let invalidateOnNewOsBiometrics = message.invalidateOnNewOsBiometrics {
			registration.invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics)
		}

		if let requestHeaders = message.requestHeaders {
			registration.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.authenticatorSelectorProvided {
			registration.authenticatorSelector(operation.authenticatorSelector)
		}

		if message.pinEnrollerProvided {
			registration.pinEnroller(operation.pinEnroller)
		}

		if message.biometricUserVerifierProvided {
			registration.biometricUserVerifier(operation.biometricUserVerifier)
		}

        if message.devicePasscodeUserVerifierProvided {
            registration.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

		if message.onSuccessProvided {
			registration.onSuccess { operation.onSuccess(nil) }
		}

		if message.onErrorProvided {
			registration.onError(operation.onError)
		}

		registration.execute()
	}
}
