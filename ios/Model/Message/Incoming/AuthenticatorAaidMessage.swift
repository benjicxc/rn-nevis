//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class AuthenticatorAaidMessage: ChannelInMessage {
	// MARK: Properties

	let aaid: String

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case aaid
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.aaid = try container.decode(String.self, forKey: .aaid)
		try super.init(from: decoder)
	}
}
