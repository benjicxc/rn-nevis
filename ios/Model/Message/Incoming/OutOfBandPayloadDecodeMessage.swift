//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class OutOfBandPayloadDecodeMessage: OperationMessage {
	// MARK: Properties

	var json: String?
	var base64UrlEncoded: String?

	enum CodingKeys: String, CodingKey {
		case json
		case base64UrlEncoded
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.json = try container.decodeIfPresent(String.self, forKey: .json)
		self.base64UrlEncoded = try container.decodeIfPresent(String.self, forKey: .base64UrlEncoded)
		try super.init(from: decoder)
	}
}
