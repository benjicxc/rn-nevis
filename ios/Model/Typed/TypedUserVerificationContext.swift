//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedUserVerificationContext: Encodable {
	// MARK: Properties

	let wrapped: UserVerificationContext
	let operationId: String

	// MARK: Coding Keys

	enum CodingKeys: CodingKey {
		case operationId
		case authenticator
		case authenticatorProtectionStatus
		case lastRecoverableError
	}

	enum UserVerificationContextType: String, Encodable {
		case pin = "PinUserVerificationContext"
		case fingerprint = "FingerprintUserVerificationContext"
		case biometric = "BiometricUserVerificationContext"
		case devicePasscode = "DevicePasscodeUserVerificationContext"
	}

	// MARK: Encodable

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		try container.encode(operationId, forKey: .operationId)

		if let context = wrapped as? PinUserVerificationContext {
			try container.encode(UserVerificationContextType.pin, forKey: .type)

			var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
			try dataContainer.encode(operationId, forKey: .operationId)

			// typed authenticator
			let authenticator = TypedAuthenticator(wrapped: context.authenticator)
			try dataContainer.encode(authenticator, forKey: .authenticator)
			// typed protection status
			let status = TypedPinAuthenticatorProtectionStatus(wrapped: context.authenticatorProtectionStatus)
			try dataContainer.encode(status, forKey: .authenticatorProtectionStatus)

			if let lastRecoverableError = context.lastRecoverableError {
				// typed pin user verification error
				let pinUserVerificationError = TypedPinUserVerificationError(wrapped: lastRecoverableError)
				try dataContainer.encode(pinUserVerificationError, forKey: .lastRecoverableError)
			}
		}
		else if let context = wrapped as? BiometricUserVerificationContext {
			if context.authenticator.aaid == AuthenticatorAaid.Fingerprint.rawValue {
				try container.encode(UserVerificationContextType.fingerprint, forKey: .type)
			}
			else if context.authenticator.aaid == AuthenticatorAaid.FaceRecognition.rawValue {
				try container.encode(UserVerificationContextType.biometric, forKey: .type)
			}

			var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
			try dataContainer.encode(operationId, forKey: .operationId)

			// typed authenticator
			let authenticator = TypedAuthenticator(wrapped: context.authenticator)
			try dataContainer.encode(authenticator, forKey: .authenticator)
		}
		else if let context = wrapped as? DevicePasscodeUserVerificationContext {
			try container.encode(UserVerificationContextType.devicePasscode, forKey: .type)

			var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
			try dataContainer.encode(operationId, forKey: .operationId)

			// typed authenticator
			let authenticator = TypedAuthenticator(wrapped: context.authenticator)
			try dataContainer.encode(authenticator, forKey: .authenticator)
		}
		else {
			throw EncodingError.invalidValue(
				wrapped,
				EncodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to encode user verification context!"
				)
			)
		}
	}
}
