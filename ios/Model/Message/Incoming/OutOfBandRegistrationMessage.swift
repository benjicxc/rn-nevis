//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OutOfBandRegistrationMessage: UserInteractionOperationMessage {
	// MARK: Properties

	var deviceInformation: DeviceInformation?
	var pinPolicy: PinPolicy?
	var allowDevicePasscodeAsFallback: Bool?
	var invalidateOnNewOsBiometrics: Bool?

	enum CodingKeys: String, CodingKey {
		case deviceInformation
		case pinPolicy
		case allowDevicePasscodeAsFallback
		case invalidateOnNewOsBiometrics
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.deviceInformation = try container.decodeIfPresent(DeviceInformation.self, forKey: .deviceInformation)
		self.pinPolicy = try container.decodeIfPresent(PinPolicy.self, forKey: .pinPolicy)
		self.allowDevicePasscodeAsFallback = try container.decodeIfPresent(Bool.self, forKey: .allowDevicePasscodeAsFallback)
		self.invalidateOnNewOsBiometrics = try container.decodeIfPresent(Bool.self, forKey: .invalidateOnNewOsBiometrics)
		try super.init(from: decoder)
	}
}
