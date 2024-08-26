//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class OutOfBandOperationMessage: OperationMessage {
	// MARK: Properties

	let subOperationId: String
	var payload: OutOfBandPayload?
	let onRegistrationProvided: Bool
	let onAuthenticationProvided: Bool

	enum CodingKeys: String, CodingKey {
		case subOperationId
		case payload
		case onRegistrationProvided
		case onAuthenticationProvided
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.subOperationId = try container.decode(String.self, forKey: .subOperationId)
		self.payload = try container.decodeIfPresent(OutOfBandPayload.self, forKey: .payload)
		self.onRegistrationProvided = try container.decode(Bool.self, forKey: .onRegistrationProvided)
		self.onAuthenticationProvided = try container.decode(Bool.self, forKey: .onAuthenticationProvided)
		try super.init(from: decoder)
	}
}
