//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class OperationMessage: ChannelInMessage {
	// MARK: Properties

	let onSuccessProvided: Bool
	let onErrorProvided: Bool
	var requestHeaders: RequestHeadersMessage?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case onSuccessProvided
		case onErrorProvided
		case requestHeaders
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.onSuccessProvided = try container.decode(Bool.self, forKey: .onSuccessProvided)
		self.onErrorProvided = try container.decode(Bool.self, forKey: .onErrorProvided)
		self.requestHeaders = try container.decodeIfPresent(RequestHeadersMessage.self, forKey: .requestHeaders)
		try super.init(from: decoder)
	}
}
