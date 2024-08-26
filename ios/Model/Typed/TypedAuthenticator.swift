//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedAuthenticator: Encodable {
	// MARK: Properties

	let wrapped: any Authenticator

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case aaid
		case registration
		case userEnrollment
		case isSupportedByHardware
	}
	
	enum RegistrationCodingKeys: CodingKey {
		case registeredAccounts
	}

	enum AccountCodingKeys: String, CodingKey {
		case username
		case server
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(wrapped.aaid, forKey: .aaid)

		if let registration = wrapped.registration {
			var registrationContainer = container.nestedContainer(keyedBy: RegistrationCodingKeys.self, forKey: .registration)
			var registeredAccountsContainer = registrationContainer.nestedUnkeyedContainer(forKey: .registeredAccounts)
			try registration.registeredAccounts.forEach {
				var accountContainer = registeredAccountsContainer.nestedContainer(keyedBy: AccountCodingKeys.self)
				try accountContainer.encode($0.username, forKey: .username)
				try accountContainer.encode($0.server, forKey: .server)
			}
		}
		
		try container.encode(wrapped.isSupportedByHardware, forKey: .isSupportedByHardware)
		if let userEnrollment = wrapped.userEnrollment {
			let typedUserEnrollment = TypedUserEnrollment(wrapped: userEnrollment)
			try container.encode(typedUserEnrollment, forKey: .userEnrollment)
		}
	}
}
