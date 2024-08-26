//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

@objc(RNEventEmitter)
open class RNEventEmitter: RCTEventEmitter {

	override init() {
		super.init()
		EventEmitter.shared.register(eventEmitter: self)
	}

	@objc
	override public static func requiresMainQueueSetup() -> Bool {
		return true
	}

	@objc
	override open func supportedEvents() -> [String] {
		return EventEmitter.shared.allEvents
	}

	override open func startObserving() {
		print("[RNEventEmitter startObserving]");
	}

	override open func stopObserving() {
		print("[RNEventEmitter stopObserving]");
	}
}
