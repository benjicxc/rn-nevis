//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedPinAuthenticatorProtectionStatus: Encodable {
	// MARK: Properties

	let wrapped: PinAuthenticatorProtectionStatus

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case remainingRetries
		case coolDownTimeInSec
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)

		let reflection = Mirror(reflecting: wrapped)
		if reflection.displayStyle == .enum, let associated = reflection.children.first {
			try container.encode(associated.label!, forKey: .type)
		}
		else {
			try container.encode("\(wrapped)", forKey: .type)
		}

		var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
		if case let .LastAttemptFailed(remainingTries, coolDown) = wrapped {
			try dataContainer.encode(remainingTries, forKey: .remainingRetries)
			try dataContainer.encode(coolDown, forKey: .coolDownTimeInSec)
		}
	}
}
