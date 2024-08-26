//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class LocalAccountsOutMessage: ChannelOutMessage {
	// MARK: Properties

	let accounts: [any Account]

	// MARK: Initialization

	init(operationId: String, accounts: [any Account]) {
		self.accounts = accounts
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case accounts
	}
	
	enum AccountCodingKeys: String, CodingKey {
		case username
		case server
	}
	
	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		var nestedUnkeyedContainer = container.nestedUnkeyedContainer(forKey: .accounts)
		try accounts.forEach {
			var accountContainer = nestedUnkeyedContainer.nestedContainer(keyedBy: AccountCodingKeys.self)
			try accountContainer.encode($0.username, forKey: .username)
			try accountContainer.encode($0.server, forKey: .server)
		}
		
		try super.encode(to: encoder)
	}
}
