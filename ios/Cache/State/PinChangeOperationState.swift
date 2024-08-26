//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinChangeOperationState: OperationState {
	// MARK: OperationState

	func cancel() {
		fatalError("Must override.")
	}
}

// MARK: -

class PinChange: PinChangeOperationState {
	// MARK: Properties

	let context: PinChangeContext?
	let handler: PinChangeHandler?

	// MARK: Initialization

	init(context: PinChangeContext?, handler: PinChangeHandler? = nil) {
		self.context = context
		self.handler = handler
	}

	// MARK: OperationState

	override func cancel() {
		handler?.cancel()
	}
}
