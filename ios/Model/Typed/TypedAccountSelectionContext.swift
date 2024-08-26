//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedAccountSelectionContext: Encodable {
	// MARK: Properties

	let wrapped: AccountSelectionContext
	let operationId: String

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case operationId
		case accounts
		case authenticators
		case transactionConfirmationData
	}

	enum AccountCodingKeys: String, CodingKey {
		case username
		case server
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(operationId, forKey: .operationId)
		var nestedUnkeyedContainer = container.nestedUnkeyedContainer(forKey: .accounts)
		try wrapped.accounts.forEach {
			var accountContainer = nestedUnkeyedContainer.nestedContainer(keyedBy: AccountCodingKeys.self)
			try accountContainer.encode($0.username, forKey: .username)
			try accountContainer.encode($0.server, forKey: .server)
		}
		let authenticators = wrapped.authenticators.map { TypedAuthenticator(wrapped: $0) }
		try container.encodeIfPresent(authenticators, forKey: .authenticators)
		if let transactionConfirmationData = wrapped.transactionConfirmationData {
			let decoded = String(decoding: transactionConfirmationData, as: UTF8.self)
			try container.encode(decoded, forKey: .transactionConfirmationData)
		}
	}
}
