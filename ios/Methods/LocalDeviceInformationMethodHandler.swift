//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct LocalDeviceInformationMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let resultMessage = LocalDeviceInformationOutMessage(operationId: message.operationId,
																deviceInformation: client.localData.deviceInformation)
		MethodChannelHandler.shared.resolve(method: .localDeviceInformation, message: resultMessage)
	}
}
