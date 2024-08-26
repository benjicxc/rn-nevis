//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

enum ReactMethod: String {
	// Incoming calls. The method call started on Javascript side but it is implemented, executed on native side.
	// Basic SDK invocations
	case initClient
	case payloadDecode
	case oobOperation
	case oobRegister
	case oobAuthenticate
	case register
	case authCloudApiRegister
	case authenticate
	case deregister
	case pinChange
	case deviceInformationChange
	case localAccounts
	case localAuthenticators
    case localDeleteAuthenticator
	case localDeviceInformation

	// Auxiliary SDK invocations
	case cancel
	case accountUsername
	case authenticatorAaid
	case pinEnroll
	case pinsChange
	case pinVerify
	case isPolicyCompliant
	case listenForOsCredentials
}
