//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class LocalAccountsMessage: ChannelInMessage {}

// MARK: -

class LocalAuthenticatorsMessage: ChannelInMessage {}

// MARK: -

class LocalDeviceInformationMessage: ChannelInMessage {}

// MARK: -

class LocalDeleteAuthenticatorMessage: ChannelInMessage {
	// MARK: Properties

	let username: String
	let aaid: String?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
		case aaid
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decode(String.self, forKey: .username)
		self.aaid = try container.decodeIfPresent(String.self, forKey: .aaid)
		try super.init(from: decoder)
	}
}
