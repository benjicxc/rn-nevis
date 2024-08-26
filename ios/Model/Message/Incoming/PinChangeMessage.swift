//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinChangeMessage: OperationMessage {
	// MARK: Properties

	var username: String?
	var pinPolicy: PinPolicy?
	let pinChangerProvided: Bool

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
		case pinPolicy
		case pinChangerProvided
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decodeIfPresent(String.self, forKey: .username)
		self.pinPolicy = try container.decodeIfPresent(PinPolicy.self, forKey: .pinPolicy)
		self.pinChangerProvided = try container.decode(Bool.self, forKey: .pinChangerProvided)
		try super.init(from: decoder)
	}
}
