//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

enum Event: String, CaseIterable {
	case operationType
	case selectAccount
	case selectAuthenticator
	case pinEnroll
	case pinChange
	case verifyUser
}

class EventEmitter {
	static let shared = EventEmitter()

	// MARK: Properties

	private static var eventEmitter: RNEventEmitter!
	lazy var allEvents: [String] = Event.allCases.map { $0.rawValue }

	// MARK: Initialization

	private init() {}

	// MARK: Public Interface

	func register(eventEmitter: RNEventEmitter) {
		EventEmitter.eventEmitter = eventEmitter
	}

	func dispatch(event: Event, message: ChannelOutMessage) {
		do {
			let body = try JsonMapper.encode(message)
			EventEmitter.eventEmitter.sendEvent(withName: event.rawValue, body: body)
		} catch {
			OperationCache.shared.delete(by: message.operationId)
			print("Failed to dispatch event. Error: \(error.localizedDescription)")
		}
	}
}
