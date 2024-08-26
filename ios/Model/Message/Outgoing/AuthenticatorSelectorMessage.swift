//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class AuthenticatorSelectorMessage: ChannelOutMessage {
	// MARK: Properties

	var context: TypedAuthenticatorSelectionContext

	// MARK: Initialization

	init(operationId: String, context: AuthenticatorSelectionContext) {
		self.context = TypedAuthenticatorSelectionContext(wrapped: context,
		                                                  operationId: operationId)
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case context
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encodeIfPresent(context, forKey: .context)
		try super.encode(to: encoder)
	}
}
