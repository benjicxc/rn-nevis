//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct AuthCloudApiRegistrationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: AuthCloudApiRegistrationMessage = try validate(message: message)
		let operation = AuthCloudApiRegistrationOperation(operationId: message.operationId,
															pinPolicy: message.pinPolicy)
		OperationCache.shared.put(operation, using: message.operationId)

		let authCloudApiRegistration = client.operations.authCloudApiRegistration
		if let enrollResponse = message.enrollResponse {
			authCloudApiRegistration.enrollResponse(enrollResponse)
		}
		else if let appLinkUri = message.appLinkUri {
			authCloudApiRegistration.appLinkUri(appLinkUri)
		}

		if let deviceInformation = message.deviceInformation {
			authCloudApiRegistration.deviceInformation(deviceInformation)
		}

		if let allowDevicePasscodeAsFallback = message.allowDevicePasscodeAsFallback {
			authCloudApiRegistration.allowDevicePasscodeAsFallback(allowDevicePasscodeAsFallback)
		}

		if let invalidateOnNewOsBiometrics = message.invalidateOnNewOsBiometrics {
			authCloudApiRegistration.invalidateOnNewOsBiometrics(invalidateOnNewOsBiometrics)
		}

		if let requestHeaders = message.requestHeaders {
			authCloudApiRegistration.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.authenticatorSelectorProvided {
			authCloudApiRegistration.authenticatorSelector(operation.authenticatorSelector)
		}

		if message.pinEnrollerProvided {
			authCloudApiRegistration.pinEnroller(operation.pinEnroller)
		}

		if message.biometricUserVerifierProvided {
			authCloudApiRegistration.biometricUserVerifier(operation.biometricUserVerifier)
		}

		if message.devicePasscodeUserVerifierProvided {
			authCloudApiRegistration.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
		}

		if message.onSuccessProvided {
			authCloudApiRegistration.onSuccess { operation.onSuccess(nil) }
		}

		if message.onErrorProvided {
			authCloudApiRegistration.onError(operation.onError)
		}

		authCloudApiRegistration.execute()
	}
}
