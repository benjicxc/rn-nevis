//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct TypedRetryPolicy: Decodable {
	// MARK: Properties

	let wrapped: RetryPolicy

	// MARK: Decodable

	init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: TypedCodingKeys.self)
		let type = try container.decode(String.self, forKey: .type)
		switch type {
		case RetryPolicy.CodingKeys.Case.noRetry.stringValue:
			wrapped = .noRetry
		case RetryPolicy.CodingKeys.Case.constant.stringValue:
			let dataContainer = try container.nestedContainer(keyedBy: RetryPolicy.CodingKeys.Constant.self,
															  forKey: .data)
			let maxRetries = try dataContainer.decode(Int.self, forKey: .maxRetries)
			let delayInSeconds = try dataContainer.decode(TimeInterval.self, forKey: .delayInSeconds)
			wrapped = .constant(maxRetries: maxRetries,
								delayInSeconds: delayInSeconds)
		case RetryPolicy.CodingKeys.Case.exponential.stringValue:
			let dataContainer = try container.nestedContainer(keyedBy: RetryPolicy.CodingKeys.Exponential.self,
															  forKey: .data)
			let maxRetries = try dataContainer.decode(Int.self, forKey: .maxRetries)
			let initialDelayInSeconds = try dataContainer.decode(TimeInterval.self, forKey: .initialDelayInSeconds)
			let multiplier = try dataContainer.decode(Double.self, forKey: .multiplier)
			let maximumDelayInSeconds = try dataContainer.decode(TimeInterval.self, forKey: .maximumDelayInSeconds)
			wrapped = .exponential(maxRetries: maxRetries,
								   initialDelayInSeconds: initialDelayInSeconds,
								   multiplier: multiplier,
								   maximumDelayInSeconds: maximumDelayInSeconds)
		default:
			throw DecodingError.dataCorrupted(
				DecodingError.Context(
					codingPath: container.codingPath,
					debugDescription: "Failed to decode retry policy!"
				)
			)
		}
	}
}

extension RetryPolicy {
	enum CodingKeys {
		enum Case: CodingKey {
			case noRetry
			case constant
			case exponential
		}

		enum Constant: CodingKey {
			case maxRetries
			case delayInSeconds
		}

		enum Exponential: CodingKey {
			case maxRetries
			case initialDelayInSeconds
			case multiplier
			case maximumDelayInSeconds
		}
	}
	
	var caseName: String {
		return Mirror(reflecting: self).children.first?.label ?? String(describing: self)
	}
}
