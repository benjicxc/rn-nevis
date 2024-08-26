//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct OutOfBandRegistrationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: OutOfBandRegistrationMessage = try validate(message: message)
		let operation: OutOfBandRegistrationOperation = try OperationCache.shared.read(by: message.operationId)

		operation.update(operationId: message.operationId,
		                 pinPolicy: message.pinPolicy)

		if let deviceInformation = message.deviceInformation {
			operation.registration.deviceInformation(deviceInformation)
		}

		if let allowDevicePasscodeAsFallback = message.allowDevicePasscodeAsFallback {
			operation.registration.allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback)
		}

		if let invalidateOnNewOsBiometrics = message.invalidateOnNewOsBiometrics {
			operation.registration.invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics)
		}

		if let requestHeaders = message.requestHeaders {
			operation.registration.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.authenticatorSelectorProvided {
			operation.registration.authenticatorSelector(operation.authenticatorSelector)
		}

		if message.pinEnrollerProvided {
			operation.registration.pinEnroller(operation.pinEnroller)
		}

		if message.biometricUserVerifierProvided {
			operation.registration.biometricUserVerifier(operation.biometricUserVerifier)
		}

        if message.devicePasscodeUserVerifierProvided {
            operation.registration.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

		if message.onSuccessProvided {
			operation.registration.onSuccess { operation.onSuccess(nil) }
		}

		if message.onErrorProvided {
			operation.registration.onError(operation.onError)
		}

		operation.registration.execute()
		OperationCache.shared.put(operation, using: message.operationId)
	}
}
