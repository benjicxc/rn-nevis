//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class LocalAuthenticatorsOutMessage: ChannelOutMessage {
	// MARK: Properties

	let authenticators: [TypedAuthenticator]

	// MARK: Initialization

	init(operationId: String, authenticators: [any Authenticator]) {
		self.authenticators = authenticators.map { TypedAuthenticator(wrapped: $0) }
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case authenticators
	}
	
	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(authenticators, forKey: .authenticators)
		try super.encode(to: encoder)
	}
}
