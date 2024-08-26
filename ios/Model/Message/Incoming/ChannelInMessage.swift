//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class ChannelInMessage: Decodable {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}
