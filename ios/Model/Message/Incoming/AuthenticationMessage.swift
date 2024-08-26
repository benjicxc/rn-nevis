//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class AuthenticationMessage: UserInteractionOperationMessage {
	// MARK: Properties

	var username: String?
	var sessionProvider: TypedSessionProvider?
	var retryPolicy: TypedRetryPolicy?

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case username
		case sessionProvider
		case retryPolicy
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.username = try container.decodeIfPresent(String.self, forKey: .username)
		self.sessionProvider = try container.decodeIfPresent(TypedSessionProvider.self, forKey: .sessionProvider)
		self.retryPolicy = try container.decodeIfPresent(TypedRetryPolicy.self, forKey: .retryPolicy)
		try super.init(from: decoder)
	}
}
