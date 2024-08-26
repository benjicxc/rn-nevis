//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedPinEnrollmentContext: Encodable {
	// MARK: Properties

	let wrapped: PinEnrollmentContext
	let operationId: String

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case operationId
		case username
		case lastRecoverableError
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(operationId, forKey: .operationId)
		try container.encode(wrapped.username, forKey: .username)
		if let lastRecoverableError = wrapped.lastRecoverableError {
			// typed pin enrollment error
			let wrapped = TypedPinEnrollmentError(wrapped: lastRecoverableError)
			try container.encode(wrapped, forKey: .lastRecoverableError)
		}
	}
}
