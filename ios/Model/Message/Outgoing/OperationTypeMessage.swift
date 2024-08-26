//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

enum OperationType: String {
	case registration
	case authentication
}

class OperationTypeMessage: ChannelOutMessage {
	// MARK: Properties

	let operationType: OperationType

	init(operationId: String, operationType: OperationType) {
		self.operationType = operationType
		super.init(operationId: operationId)
	}

	// MARK: Encodable

	enum CodingKeys: String, CodingKey {
		case operationType
	}

	override func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(operationType.rawValue.uppercased(), forKey: .operationType)
		try super.encode(to: encoder)
	}
}
