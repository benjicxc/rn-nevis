//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class OperationCache {
	static let shared = OperationCache()

	// MARK: Properties

	private var cache: [String: Operation] = [:]

	// MARK: Initialization

	private init() {}

	// MARK: Public Interface

	@discardableResult
	func put(_ operation: Operation, using id: String) -> Operation {
		cache[id] = operation
		return operation
	}

	func read<T>(by id: String) throws -> T {
		guard let operation = cache[id] else {
			throw PluginError.illegalState("Operation is missing!")
		}

		guard type(of: operation) is T.Type else {
			throw PluginError.illegalArgument("Wrong type of operation found!")
		}

		return operation as! T
	}

	func update(by id: String, operation: Operation) {
		cache[id] = operation
	}

	func delete(by id: String) {
		cache.removeValue(forKey: id)
	}

	func cancel(by id: String) {
		cache[id]?.cancel()
		delete(by: id)
	}
}
