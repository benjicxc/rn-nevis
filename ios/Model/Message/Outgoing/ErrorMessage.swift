//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class ErrorMessage: ChannelOutMessage {
	// MARK: Properties

	var exception: ChannelError?

	// MARK: Initialization

	init(operationId: String, error: Error? = nil) {
		if let error {
			self.exception = error.asChannelError()
		}
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case exception
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encodeIfPresent(exception, forKey: .exception)
		try super.encode(to: encoder)
	}
}
