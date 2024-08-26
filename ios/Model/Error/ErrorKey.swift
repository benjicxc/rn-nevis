//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

enum ErrorKey: String {
	case type
	case data
	case description
	case errorCode
	case sessionProvider
	case cause
}

enum PlatformChannelError: String {
	case deleteAuthenticator = "DeleteAuthenticatorException"
	case mapping = "MappingError"
}
