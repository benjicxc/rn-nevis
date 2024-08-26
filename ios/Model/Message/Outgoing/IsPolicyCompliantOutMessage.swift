//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class IsPolicyCompliantOutMessage: ChannelOutMessage {
	// MARK: Properties

	let isPolicyCompliant: Bool

	// MARK: Initialization

	init(operationId: String, isPolicyCompliant: Bool) {
		self.isPolicyCompliant = isPolicyCompliant
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case isPolicyCompliant
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encodeIfPresent(isPolicyCompliant, forKey: .isPolicyCompliant)
		try super.encode(to: encoder)
	}
}
