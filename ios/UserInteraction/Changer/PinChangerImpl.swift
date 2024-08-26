//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

class PinChangerImpl {
	// MARK: Properties

	let operationId: String
	let policy: PinPolicy?

	// MARK: Initialization

	init(operationId: String, pinPolicy: PinPolicy?) {
		self.operationId = operationId
		self.policy = pinPolicy
	}
}

// MARK: - PinChanger

extension PinChangerImpl: PinChanger {
	func changePin(context: PinChangeContext, handler: PinChangeHandler) {
		do {
			let operation: PinChangeOperation = try OperationCache.shared.read(by: operationId)
			let state = PinChange(context: context, handler: handler)
			OperationCache.shared.update(by: operationId,
			                             operation: operation.update(state: state))

			let message = PinChangerMessage(operationId: operationId,
			                                context: context)
			EventEmitter.shared.dispatch(event: .pinChange, message: message)
		}
		catch {
			OperationCache.shared.delete(by: operationId)
			fatalError("Failed to change pin! Error: \(error.localizedDescription)")
		}
	}

	func pinPolicy() -> PinPolicy {
		policy ?? PinPolicy()
	}
}
