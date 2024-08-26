//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedUserEnrollment: Encodable {
	// MARK: Properties

	let wrapped: any UserEnrollment

	// MARK: Encodable

	enum CodingKeys: CodingKey {
		case isEnrolled
		case enrolledAccounts
	}

	enum UserEnrollmentType: String, Encodable {
		case os = "OsUserEnrollment"
		case sdk = "SdkUserEnrollment"
	}

	enum AccountCodingKeys: String, CodingKey {
		case username
		case server
	}

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: TypedCodingKeys.self)
		if let userEnrollment = wrapped as? OsUserEnrollment {
			try container.encode(UserEnrollmentType.os, forKey: .type)

			var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
			try dataContainer.encode(userEnrollment.isEnrolled(), forKey: .isEnrolled)
		}
		else if let userEnrollment = wrapped as? SdkUserEnrollment {
			try container.encode(UserEnrollmentType.sdk, forKey: .type)
			var dataContainer = container.nestedContainer(keyedBy: CodingKeys.self, forKey: .data)
			var enrolledAccountsContainer = dataContainer.nestedUnkeyedContainer(forKey: .enrolledAccounts)
			try userEnrollment.enrolledAccounts.forEach {
				var accountContainer = enrolledAccountsContainer.nestedContainer(keyedBy: AccountCodingKeys.self)
				try accountContainer.encode($0.username, forKey: .username)
				try accountContainer.encode($0.server, forKey: .server)
			}
		} else {
			throw EncodingError.invalidValue(
				wrapped,
				EncodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to encode user enrollment!"
				)
			)
		}
	}
}
