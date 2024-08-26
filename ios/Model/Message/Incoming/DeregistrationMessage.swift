//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class DeregistrationMessage: OperationMessage {
	// MARK: Properties

	var username: String?
	var aaid: String?
	var authorizationProvider: TypedAuthorizationProvider?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
		case aaid
		case authorizationProvider
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decodeIfPresent(String.self, forKey: .username)
		self.aaid = try container.decodeIfPresent(String.self, forKey: .aaid)
		self.authorizationProvider = try container.decodeIfPresent(TypedAuthorizationProvider.self, forKey: .authorizationProvider)
		try super.init(from: decoder)
	}
}
