//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedPinUserVerificationError: Encodable {
	// MARK: Properties

	let wrapped: PinUserVerificationError

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case description
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		try container.encode(wrapped.mirror.label, forKey: .type)
		var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
		try dataContainer.encode(wrapped.localizedDescription, forKey: .description)
	}
}
