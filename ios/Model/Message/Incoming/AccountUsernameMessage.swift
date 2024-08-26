//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class AccountUsernameMessage: ChannelInMessage {
	// MARK: Properties

	let username: String

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decode(String.self, forKey: .username)
		try super.init(from: decoder)
	}
}
