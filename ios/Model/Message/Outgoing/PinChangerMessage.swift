//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinChangerMessage: ChannelOutMessage {
	// MARK: Properties

	var context: TypedPinChangeContext

	// MARK: Initialization

	init(operationId: String, context: PinChangeContext) {
		self.context = TypedPinChangeContext(wrapped: context,
		                                     operationId: operationId)
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case context
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(context, forKey: .context)
		try super.encode(to: encoder)
	}
}
