//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct ListenForOsCredentialsMethodHandler: MethodHandler {
	func execute(using _: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: ListenForOsCredentialsMessage = try validate(message: message)
		let operation: UserInteractionOperation = try OperationCache.shared.read(by: message.operationId)
		guard let state = operation.state as? VerifyUserState else {
			throw PluginError.illegalState("Verify User state is expected!")
		}

		switch state.verificationMode {
		case .biometric:
			state.biometricUserVerificationHandler?.verify()
		case .devicePasscode:
			state.devicePasscodeUserVerificationHandler?.verify()
		default:
			throw PluginError.illegalState("ListenForOsCredentials can be only called during biometric authentication!")
		}

		MethodChannelHandler.shared.resolve(method: .listenForOsCredentials, message: nil)
	}
}
