//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class RegistrationMessage: UserInteractionOperationMessage {
	// MARK: Properties

	var username: String?
	var serverUrl: String?
	var pinPolicy: PinPolicy?
	var deviceInformation: DeviceInformation?
	var authorizationProvider: TypedAuthorizationProvider?
	var allowDevicePasscodeAsFallback: Bool?
	var invalidateOnNewOsBiometrics: Bool?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
		case serverUrl
		case pinPolicy
		case deviceInformation
		case authorizationProvider
		case allowDevicePasscodeAsFallback
		case invalidateOnNewOsBiometrics
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decodeIfPresent(String.self, forKey: .username)
		self.serverUrl = try container.decodeIfPresent(String.self, forKey: .serverUrl)
		self.pinPolicy = try container.decodeIfPresent(PinPolicy.self, forKey: .pinPolicy)
		self.deviceInformation = try container.decodeIfPresent(DeviceInformation.self, forKey: .deviceInformation)
		self.authorizationProvider = try container.decodeIfPresent(TypedAuthorizationProvider.self, forKey: .authorizationProvider)
		self.allowDevicePasscodeAsFallback = try container.decodeIfPresent(Bool.self, forKey: .allowDevicePasscodeAsFallback)
		self.invalidateOnNewOsBiometrics = try container.decodeIfPresent(Bool.self, forKey: .invalidateOnNewOsBiometrics)
		try super.init(from: decoder)
	}
}
