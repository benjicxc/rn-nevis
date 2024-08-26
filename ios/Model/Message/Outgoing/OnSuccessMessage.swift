//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OnSuccessMessage: ChannelOutMessage {
	// MARK: Properties

	var authorizationProvider: TypedAuthorizationProvider?
	var payload: OutOfBandPayload?

	// MARK: Initialization

	init(operationId: String,
		 authorizationProvider: AuthorizationProvider? = nil,
		 payload: OutOfBandPayload? = nil)
	{
		if let authorizationProvider {
			self.authorizationProvider = TypedAuthorizationProvider(wrapped: authorizationProvider)
		}
		self.payload = payload
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case authorizationProvider
		case outOfBandPayload
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encodeIfPresent(authorizationProvider, forKey: .authorizationProvider)
		try container.encodeIfPresent(payload, forKey: .outOfBandPayload)
		try super.encode(to: encoder)
	}
}
