//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class PinsChangeMessage: ChannelInMessage {
	// MARK: Properties

	let oldPin: String
	let newPin: String

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case oldPin
		case newPin
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.oldPin = try container.decode(String.self, forKey: .oldPin)
		self.newPin = try container.decode(String.self, forKey: .newPin)
		try super.init(from: decoder)
	}
}
