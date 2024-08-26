//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Darwin
import NevisMobileAuthentication

extension MobileAuthenticationClientError {
	func asChannelError() -> ChannelError {
		let mirror = mirror
		let type = mirror.label // enum name
		let params = mirror.params // associated values (name: value)

		let cause = (params[ErrorKey.cause.rawValue] as? Error)?.localizedDescription
		let fidoError = params[ErrorKey.errorCode.rawValue] as? FidoErrorCode
		var typedSessionProvider: TypedSessionProvider?
		if let sessionProvider = params[ErrorKey.sessionProvider.rawValue] as? SessionProvider {
			typedSessionProvider = TypedSessionProvider(wrapped: sessionProvider)
		}

		return ChannelError(type: type,
							description: localizedDescription,
							innerError: fidoError,
							sessionProvider: typedSessionProvider ?? nil,
							cause: cause)
	}
}
