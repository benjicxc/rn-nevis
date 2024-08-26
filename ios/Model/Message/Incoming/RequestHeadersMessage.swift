//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class RequestHeadersMessage: Decodable {
	// MARK: Properties

	let namesAndValues: HttpOperation.RequestHeaders

	// MARK: Decodable

	enum CodingKeys: CodingKey {
		case namesAndValues
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.namesAndValues = try container.decode(HttpOperation.RequestHeaders.self, forKey: .namesAndValues)
	}
}
