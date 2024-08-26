//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class ChannelOutMessage: Encodable {
	// MARK: Properties

	let operationId: String

	// MARK: Initialization

	init(operationId: String) {
		self.operationId = operationId
	}
}
