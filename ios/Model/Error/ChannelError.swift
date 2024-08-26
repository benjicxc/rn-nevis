//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct ChannelError: Encodable {
	// MARK: Properties

	let type: String
	let description: String
	// used only when either one of the following error occurs:
	// - OperationError.FidoError
	// - AuthCloudApiError.FidoError
	// - AuthenticationError.FidoError
	let innerError: FidoErrorCode?
	// used only when either one of the following error occurs:
	// - AuthenticationError.FidoError
	// - AuthenticationError.NetworkError
	let sessionProvider: TypedSessionProvider?
	let cause: String?

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case description
		case errorCode
		case sessionProvider
		case cause
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		try container.encode(type, forKey: .type)

		var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
		try dataContainer.encode(description, forKey: .description)
		try dataContainer.encodeIfPresent(innerError, forKey: .errorCode)
		try dataContainer.encodeIfPresent(sessionProvider, forKey: .sessionProvider)
		try dataContainer.encodeIfPresent(cause, forKey: .cause)
	}
}

// MARK: - FidoErrorCode - Encodable

extension FidoErrorCode: Encodable {
	enum CodingKeys: CodingKey {
		case type
		case description
	}

	public func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		let type = String(describing: self)
		try container.encode(type.snakeUpperCase(), forKey: .type)
		try container.encodeIfPresent(errorDescription, forKey: .description)
	}
}

// MARK: - FidoErrorCode - CustomStringConvertible

extension FidoErrorCode: CustomStringConvertible {
	// mirror is not working in case of @objc annotated enums
	public var description: String {
		switch self {
		case .noError:
			return "noError"
		case .waitUserAction:
			return "waitUserAction"
		case .insecureTransport:
			return "insecureTransport"
		case .userCanceled:
			return "userCanceled"
		case .unsupportedVersion:
			return "unsupportedVersion"
		case .noSuitableAuthenticator:
			return "noSuitableAuthenticator"
		case .protocolError:
			return "protocolError"
		case .untrustedFacetID:
			return "untrustedFacetID"
		case .keyDisappearedPermanently:
			return "keyDisappearedPermanently"
		case .authenticatorAccessDenied:
			return "authenticatorAccessDenied"
		case .invalidTransactionContent:
			return "invalidTransactionContent"
		case .userNotResponsive:
			return "userNotResponsive"
		case .insufficientAuthenticatorResources:
			return "insufficientAuthenticatorResources"
		case .userLockout:
			return "userLockout"
		case .userNotEnrolled:
			return "userNotEnrolled"
		case .unknown:
			return "unknown"
		@unknown default:
			return "unknown"
		}
	}
}
