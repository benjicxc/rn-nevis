//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class PinVerifyMessage: ChannelInMessage {
	// MARK: Properties

	let pin: String

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case pin
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.pin = try container.decode(String.self, forKey: .pin)
		try super.init(from: decoder)
	}
}
