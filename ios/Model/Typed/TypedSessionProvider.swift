//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedSessionProvider: Codable {
	// MARK: Properties

	let wrapped: SessionProvider

	// MARK: Initialization

	init(wrapped: SessionProvider) {
		self.wrapped = wrapped
	}

	// MARK: Coding Keys

	enum SessionProviderType: String, Encodable {
		case cookie = "CookieSessionProvider"
		case jwt = "JwtSessionProvider"
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
		case SessionProviderType.cookie.rawValue:
			wrapped = try container.decode(CookieSessionProvider.self, forKey: .data)
		case SessionProviderType.jwt.rawValue:
			wrapped = try container.decode(JwtSessionProvider.self, forKey: .data)
		default:
			throw DecodingError.dataCorrupted(
				DecodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to decode session provider!"
				)
			)
		}
	}
	
	// MARK: Encodable

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		switch wrapped {
		case is CookieSessionProvider:
			try container.encode(SessionProviderType.cookie, forKey: .type)
		case is JwtSessionProvider:
			try container.encode(SessionProviderType.jwt, forKey: .type)
		default:
			throw EncodingError.invalidValue(
				wrapped,
				EncodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to encode session provider!"
				)
			)
		}

		try wrapped.encode(to: container.superEncoder(forKey: .data))
	}
}
