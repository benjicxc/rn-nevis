//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class InitClientMessage: OperationMessage {
	// MARK: Properties

	var configuration: Configuration?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case configuration
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.configuration = try container.decodeIfPresent(Configuration.self, forKey: .configuration)
		try super.init(from: decoder)
	}
}
