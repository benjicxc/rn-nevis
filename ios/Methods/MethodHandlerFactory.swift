//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

enum MethodHandlerFactory {
	static func create(by type: (some ChannelInMessage).Type) -> MethodHandler? {
		if type == OutOfBandOperationMessage.self {
			return OutOfBandOperationMethodHandler()
		}
		else if type == OutOfBandRegistrationMessage.self {
			return OutOfBandRegistrationMethodHandler()
		}
		else if type == OutOfBandAuthenticationMessage.self {
			return OutOfBandAuthenticationMethodHandler()
		}
		else if type == OutOfBandPayloadDecodeMessage.self {
			return OutOfBandPayloadDecodeMethodHandler()
		}
		else if type == RegistrationMessage.self {
			return RegistrationMethodHandler()
		}
		else if type == AuthCloudApiRegistrationMessage.self {
			return AuthCloudApiRegistrationMethodHandler()
		}
		else if type == AuthenticationMessage.self {
			return AuthenticationMethodHandler()
		}
		else if type == DeregistrationMessage.self {
			return DeregistrationMethodHandler()
		}
		else if type == PinChangeMessage.self {
			return PinChangeMethodHandler()
		}
		else if type == DeviceInformationChangeMessage.self {
			return DeviceInformationChangeMethodHandler()
		}
		else if type == CancelMessage.self {
			return CancelMethodHandler()
		}
		else if type == AccountUsernameMessage.self {
			return AccountUsernameMethodHandler()
		}
		else if type == AuthenticatorAaidMessage.self {
			return AuthenticatorAaidMethodHandler()
		}
		else if type == PinEnrollMessage.self {
			return PinEnrollMethodHandler()
		}
		else if type == PinsChangeMessage.self {
			return PinsChangeMethodHandler()
		}
		else if type == PinVerifyMessage.self {
			return PinVerifyMethodHandler()
		}
		else if type == IsPolicyCompliantMessage.self {
			return IsPolicyCompliantMethodHandler()
		}
		else if type == ListenForOsCredentialsMessage.self {
			return ListenForOsCredentialsMethodHandler()
		}
		else if type == LocalAccountsMessage.self {
			return LocalAccountsMethodHandler()
		}
		else if type == LocalAuthenticatorsMessage.self {
			return LocalAuthenticatorsMethodHandler()
		}
        else if type == LocalDeleteAuthenticatorMessage.self {
            return LocalDeleteAuthenticatorMethodHandler()
        }
		else if type == LocalDeviceInformationMessage.self {
			return LocalDeviceInformationMethodHandler()
		}

		return nil
	}
}
