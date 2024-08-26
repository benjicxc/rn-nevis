//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedAuthenticatorSelectionContext: Encodable {
	// MARK: Properties

	let wrapped: AuthenticatorSelectionContext
	let operationId: String

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case operationId
		case account
		case authenticators
		case transactionConfirmationData
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(operationId, forKey: .operationId)
		try container.encode(wrapped.account, forKey: .account)
		let authenticators = wrapped.authenticators.map { TypedAuthenticator(wrapped: $0) }
		try container.encode(authenticators, forKey: .authenticators)
		if let transactionConfirmationData = wrapped.transactionConfirmationData {
			let decoded = String(decoding: transactionConfirmationData, as: UTF8.self)
			try container.encode(decoded, forKey: .transactionConfirmationData)
		}
	}
}
