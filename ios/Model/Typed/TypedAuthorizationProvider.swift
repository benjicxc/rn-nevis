//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedAuthorizationProvider: Codable {
	// MARK: Properties

	let wrapped: AuthorizationProvider

	// MARK: Initialization

	init(wrapped: AuthorizationProvider) {
		self.wrapped = wrapped
	}

	// MARK: Coding Keys

	enum AuthorizationProviderType: String, Encodable {
		case cookie = "CookieAuthorizationProvider"
		case jwt = "JwtAuthorizationProvider"
	}

	enum CodingKeys: String, CodingKey {
		case cookies
		case jwt
	}

	// MARK: Decodable

	init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: TypedCodingKeys.self)
		let type = try container.decode(String.self, forKey: .type)
		switch type {
		case AuthorizationProviderType.cookie.rawValue:
			wrapped = try container.decode(CookieAuthorizationProvider.self, forKey: .data)
		case AuthorizationProviderType.jwt.rawValue:
			wrapped = try container.decode(JwtAuthorizationProvider.self, forKey: .data)
		default:
			throw DecodingError.dataCorrupted(
				DecodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to decode authorization provider!"
				)
			)
		}
	}

	// MARK: Encodable

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		switch wrapped {
		case is CookieAuthorizationProvider:
			try container.encode(AuthorizationProviderType.cookie, forKey: .type)
		case is JwtAuthorizationProvider:
			try container.encode(AuthorizationProviderType.jwt, forKey: .type)
		default:
			throw EncodingError.invalidValue(
				wrapped,
				EncodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to encode authorization provider!"
				)
			)
		}

		try wrapped.encode(to: container.superEncoder(forKey: .data))
	}
}
