//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

@objc(NevisMobileAuthenticationSdkReact)
public class NevisMobileAuthenticationSdkReact: NSObject {

	private var client: MobileAuthenticationClient?

	private let methodMessageMap: [ReactMethod: ChannelInMessage.Type] = [
		.initClient: InitClientMessage.self,
		.payloadDecode: OutOfBandPayloadDecodeMessage.self,
		.oobOperation: OutOfBandOperationMessage.self,
		.oobRegister: OutOfBandRegistrationMessage.self,
		.oobAuthenticate: OutOfBandAuthenticationMessage.self,
		.register: RegistrationMessage.self,
		.authCloudApiRegister: AuthCloudApiRegistrationMessage.self,
		.authenticate: AuthenticationMessage.self,
		.deregister: DeregistrationMessage.self,
		.deviceInformationChange: DeviceInformationChangeMessage.self,
		.pinChange: PinChangeMessage.self,
		.localAccounts: LocalAccountsMessage.self,
		.localAuthenticators: LocalAuthenticatorsMessage.self,
		.localDeleteAuthenticator: LocalDeleteAuthenticatorMessage.self,
		.localDeviceInformation: LocalDeviceInformationMessage.self,
		.authenticatorAaid: AuthenticatorAaidMessage.self,
		.accountUsername: AccountUsernameMessage.self,
		.pinEnroll: PinEnrollMessage.self,
		.pinsChange: PinsChangeMessage.self,
		.pinVerify: PinVerifyMessage.self,
		.cancel: CancelMessage.self,
		.isPolicyCompliant: IsPolicyCompliantMessage.self,
		.listenForOsCredentials: ListenForOsCredentialsMessage.self
	]

	private override init() {}

	// MARK: - Basic SDK invocations

	@objc
	func initClient(_ message: Dictionary<String, Any>,
					resolver: @escaping RCTPromiseResolveBlock,
					rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.initClient, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func payloadDecode(_ message: Dictionary<String, Any>,
					   resolver: @escaping RCTPromiseResolveBlock,
					   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.payloadDecode, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func oobOperation(_ message: Dictionary<String, Any>,
					  resolver: @escaping RCTPromiseResolveBlock,
					  rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.oobOperation, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func oobRegister(_ message: Dictionary<String, Any>,
					 resolver: @escaping RCTPromiseResolveBlock,
					 rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.oobRegister, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func oobAuthenticate(_ message: Dictionary<String, Any>,
						 resolver: @escaping RCTPromiseResolveBlock,
						 rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.oobAuthenticate, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func inBandRegister(_ message: Dictionary<String, Any>,
						resolver: @escaping RCTPromiseResolveBlock,
						rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.register, message: message, resolver: resolver, rejecter: rejecter)
	}


	@objc
	func authCloudApiRegister(_ message: Dictionary<String, Any>,
							  resolver: @escaping RCTPromiseResolveBlock,
							  rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.authCloudApiRegister, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func authenticate(_ message: Dictionary<String, Any>,
					  resolver: @escaping RCTPromiseResolveBlock,
					  rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.authenticate, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func deregister(_ message: Dictionary<String, Any>,
					resolver: @escaping RCTPromiseResolveBlock,
					rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.deregister, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func deviceInformationChange(_ message: Dictionary<String, Any>,
								 resolver: @escaping RCTPromiseResolveBlock,
								 rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.deviceInformationChange, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func pinChange(_ message: Dictionary<String, Any>,
				   resolver: @escaping RCTPromiseResolveBlock,
				   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.pinChange, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func localAccounts(_ message: Dictionary<String, Any>,
					   resolver: @escaping RCTPromiseResolveBlock,
					   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.localAccounts, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func localAuthenticators(_ message: Dictionary<String, Any>,
							 resolver: @escaping RCTPromiseResolveBlock,
							 rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.localAuthenticators, message: message, resolver: resolver, rejecter: rejecter)
	}
    
    @objc
    func localDeleteAuthenticator(_ message: Dictionary<String, Any>,
                                  resolver: @escaping RCTPromiseResolveBlock,
                                  rejecter: @escaping RCTPromiseRejectBlock) {
        handle(.localDeleteAuthenticator, message: message, resolver: resolver, rejecter: rejecter)
    }

	@objc
	func localDeviceInformation(_ message: Dictionary<String, Any>,
								resolver: @escaping RCTPromiseResolveBlock,
								rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.localDeviceInformation, message: message, resolver: resolver, rejecter: rejecter)
	}

	// MARK: - Auxiliary SDK invocations

	@objc
	func authenticatorAaid(_ message: Dictionary<String, Any>,
						   resolver: @escaping RCTPromiseResolveBlock,
						   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.authenticatorAaid, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func pinEnroll(_ message: Dictionary<String, Any>,
				   resolver: @escaping RCTPromiseResolveBlock,
				   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.pinEnroll, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func pinsChange(_ message: Dictionary<String, Any>,
					resolver: @escaping RCTPromiseResolveBlock,
					rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.pinsChange, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func pinVerify(_ message: Dictionary<String, Any>,
				   resolver: @escaping RCTPromiseResolveBlock,
				   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.pinVerify, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func accountUsername(_ message: Dictionary<String, Any>,
						 resolver: @escaping RCTPromiseResolveBlock,
						 rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.accountUsername, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func cancel(_ message: Dictionary<String, Any>,
				resolver: @escaping RCTPromiseResolveBlock,
				rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.cancel, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func isPolicyCompliant(_ message: Dictionary<String, Any>,
						   resolver: @escaping RCTPromiseResolveBlock,
						   rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.isPolicyCompliant, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func listenForOsCredentials(_ message: Dictionary<String, Any>,
								resolver: @escaping RCTPromiseResolveBlock,
								rejecter: @escaping RCTPromiseRejectBlock) {
		handle(.listenForOsCredentials, message: message, resolver: resolver, rejecter: rejecter)
	}

	@objc
	func cancelAuthentication(_ message: Dictionary<String, Any>,
								resolver: @escaping RCTPromiseResolveBlock,
								rejecter: @escaping RCTPromiseRejectBlock) {
		//not supported in iOS
		resolver(nil)
	}

	@objc
	func pauseListening(_ message: Dictionary<String, Any>,
						resolver: @escaping RCTPromiseResolveBlock,
						rejecter: @escaping RCTPromiseRejectBlock) {
		//not supported in iOS
		resolver(nil)
	}

	@objc
	func resumeListening(_ message: Dictionary<String, Any>,
						 resolver: @escaping RCTPromiseResolveBlock,
						 rejecter: @escaping RCTPromiseRejectBlock) {
		//not supported in iOS
		resolver(nil)
	}

	func handle(_ method: ReactMethod, message: Dictionary<String, Any>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
		guard let messageType = methodMessageMap[method] else {
			precondition(client != nil, "The \(method) method is not implemented!")
			return
		}

		MethodChannelHandler.shared.channelData[method] = MethodChannelData(resolver: resolver, rejecter: rejecter)
		let message = try! JsonMapper.decode(messageType, from: message)

		switch method {
		case .initClient:
			try! InitClientMethodHandler().execute(with: message) { self.client = $0 }
		default:
			precondition(client != nil, "Mobile Authentication Client was not initialized!")
			let handler = MethodHandlerFactory.create(by: messageType)
			try! handler?.execute(using: client!, with: message)
		}
	}
}
