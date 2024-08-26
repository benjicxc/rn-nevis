//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct DeviceInformationChangeMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: DeviceInformationChangeMessage = try validate(message: message)
		let operation = DeviceInformationChangeOperation(operationId: message.operationId)
		OperationCache.shared.put(operation, using: message.operationId)

		let deviceInformationChange = client.operations.deviceInformationChange
		if let name = message.name {
			deviceInformationChange.name(name)
		}

		if let fcmRegistrationToken = message.fcmRegistrationToken, !fcmRegistrationToken.isEmpty {
			deviceInformationChange.fcmRegistrationToken(fcmRegistrationToken)
		}

		if let disablePushNotifications = message.disablePushNotifications, disablePushNotifications {
			deviceInformationChange.disablePushNotifications()
		}
		
		if let retryPolicy = message.retryPolicy {
			deviceInformationChange.retryPolicy(retryPolicy.wrapped)
		}

		if let requestHeaders = message.requestHeaders {
			deviceInformationChange.requestHeaders(requestHeaders.namesAndValues)
		}

		if message.onSuccessProvided {
			deviceInformationChange.onSuccess(operation.onSuccess)
		}

		if message.onErrorProvided {
			deviceInformationChange.onError(operation.onError)
		}

		deviceInformationChange.execute()
	}
}
