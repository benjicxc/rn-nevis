//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedPinChangeContext: Encodable {
	// MARK: Properties

	let wrapped: PinChangeContext
	let operationId: String

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case operationId
		case username
		case authenticatorProtectionStatus
		case lastRecoverableError
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(operationId, forKey: .operationId)
		try container.encode(wrapped.username, forKey: .username)
		// typed protection status
		let status = TypedPinAuthenticatorProtectionStatus(wrapped: wrapped.authenticatorProtectionStatus)
		try container.encode(status, forKey: .authenticatorProtectionStatus)
		if let lastRecoverableError = wrapped.lastRecoverableError {
			// typed pin enrollment error
			let pinChangeRecoverableError = TypedPinChangeRecoverableError(wrapped: lastRecoverableError)
			try container.encode(pinChangeRecoverableError, forKey: .lastRecoverableError)
		}
	}
}
