//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class DeviceInformationChangeMessage: OperationMessage {
	// MARK: Properties

	var name: String?
	var fcmRegistrationToken: String?
	var disablePushNotifications: Bool?
	var retryPolicy: TypedRetryPolicy?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case name
		case fcmRegistrationToken
		case disablePushNotifications
		case retryPolicy
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.name = try container.decodeIfPresent(String.self, forKey: .name)
		self.fcmRegistrationToken = try container.decodeIfPresent(String.self, forKey: .fcmRegistrationToken)
		self.disablePushNotifications = try container.decodeIfPresent(Bool.self, forKey: .disablePushNotifications)
		self.retryPolicy = try container.decodeIfPresent(TypedRetryPolicy.self, forKey: .retryPolicy)
		try super.init(from: decoder)
	}
}
