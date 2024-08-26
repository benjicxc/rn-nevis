//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

protocol MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws
}

extension MethodHandler {
	func validate<T>(message: ChannelInMessage) throws -> T {
		guard type(of: message) is T.Type else {
			throw PluginError.illegalArgument("Wrong type of message received!")
		}

		return message as! T
	}
}
