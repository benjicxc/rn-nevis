//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class IsPolicyCompliantMessage: ChannelInMessage {
	// MARK: Properties

	let aaid: String
	var username: String?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case aaid
		case username
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.aaid = try container.decode(String.self, forKey: .aaid)
		self.username = try container.decodeIfPresent(String.self, forKey: .username)
		try super.init(from: decoder)
	}
}
