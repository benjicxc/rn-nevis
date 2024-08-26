//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

struct PluginError: Error {
	// MARK: Properties

	let type: ErrorType
	let message: String

	// MARK: Initialization

	init(_ type: ErrorType, message: String) {
		self.type = type
		self.message = message
	}

	// MARK: ErrorType

	enum ErrorType: String {
		case illegalArgument = "IllegalArgumentError"
		case illegalState = "IllegalStateError"
	}
}

// MARK: - LocalizedError

extension PluginError: LocalizedError {
	var errorDescription: String? {
		switch type {
		case .illegalArgument:
			return "Illegal argument error.\n\(message)"
		case .illegalState:
			return "Illegal state error.\n\(message)"
		}
	}
}

// MARK: - CustomStringConvertible

extension PluginError: CustomStringConvertible {
	var description: String {
		type.rawValue
	}
}

// MARK: - Static Constructors

extension PluginError {
	static func illegalArgument(_ message: String, file: String = #fileID, function: String = #function, line: Int = #line) -> PluginError {
		PluginError(.illegalArgument, message: "\(message)\n\nDetails:\n \(function)\n\(file):\(line)")
	}

	static func illegalState(_ message: String, file: String = #fileID, function: String = #function, line: Int = #line) -> PluginError {
		PluginError(.illegalState, message: "\(message)\n\nDetails:\n \(function)\n\(file):\(line)")
	}
}
