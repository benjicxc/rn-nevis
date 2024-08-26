//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

extension Error {
	var mirror: (label: String, params: [String: Any]) {
		let reflection = Mirror(reflecting: self)
		guard reflection.displayStyle == .enum,
		      let associated = reflection.children.first
		else {
			return ("\(self)", [:])
		}
		let values = Mirror(reflecting: associated.value).children
		var valuesMap = [String: Any]()
		for case let item in values where item.label != nil {
			valuesMap[item.label!] = item.value
		}
		return (associated.label!, valuesMap)
	}
    
    func asChannelError() -> ChannelError {
        if let error = self as? DeleteAuthenticatorError {
            return error.asChannelError()
        }
        
        if let clientError = self as? MobileAuthenticationClientError {
            return clientError.asChannelError()
        }

        return ChannelError(type: "", description: localizedDescription, innerError: nil, sessionProvider: nil, cause: nil)
    }
}
