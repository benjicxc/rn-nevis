//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

protocol OperationState {
	func cancel()
}

// MARK: -

class NoOperationState: OperationState {
	func cancel() {
		// do nothing
	}
}
