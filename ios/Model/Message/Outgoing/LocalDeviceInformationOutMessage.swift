//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class LocalDeviceInformationOutMessage: ChannelOutMessage {
	// MARK: Properties

	let deviceInformation: DeviceInformation?

	// MARK: Initialization

	init(operationId: String, deviceInformation: DeviceInformation?) {
		self.deviceInformation = deviceInformation
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case deviceInformation
	}
	
	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encodeIfPresent(deviceInformation, forKey: .deviceInformation)
		try super.encode(to: encoder)
	}
}
