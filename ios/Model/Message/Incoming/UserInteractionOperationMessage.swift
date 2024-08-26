//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class UserInteractionOperationMessage: OperationMessage {
	// MARK: Properties

	let accountSelectorProvided: Bool
	let authenticatorSelectorProvided: Bool
	let pinEnrollerProvided: Bool
	let pinUserVerifierProvided: Bool
	let biometricUserVerifierProvided: Bool
	let devicePasscodeUserVerifierProvided: Bool

	// MARK: Decodable

	enum CodingKeys: String, CodingKey {
		case accountSelectorProvided
		case authenticatorSelectorProvided
		case pinEnrollerProvided
		case pinUserVerifierProvided
		case biometricUserVerifierProvided
		case devicePasscodeUserVerifierProvided
	}

	required init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		self.accountSelectorProvided = try container.decode(Bool.self, forKey: .accountSelectorProvided)
		self.authenticatorSelectorProvided = try container.decode(Bool.self, forKey: .authenticatorSelectorProvided)
		self.pinEnrollerProvided = try container.decode(Bool.self, forKey: .pinEnrollerProvided)
		self.pinUserVerifierProvided = try container.decode(Bool.self, forKey: .pinUserVerifierProvided)
		self.biometricUserVerifierProvided = try container.decode(Bool.self, forKey: .biometricUserVerifierProvided)
		self.devicePasscodeUserVerifierProvided = try container.decode(Bool.self, forKey: .devicePasscodeUserVerifierProvided)
		try super.init(from: decoder)
	}
}
