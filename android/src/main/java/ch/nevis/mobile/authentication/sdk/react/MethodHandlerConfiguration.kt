/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import ch.nevis.mobile.authentication.sdk.react.methods.*
import ch.nevis.mobile.authentication.sdk.react.methods.userInteraction.*
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName.*
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.*

object MethodHandlerConfiguration {
    val methodInfoMap = mapOf(
        ACCOUNT_USERNAME.methodName to Pair(
            AccountUsernameMethodHandler(),
            AccountUsernameMessage.serializer()
        ),
        AUTH_CLOUD_API_REGISTER.methodName to Pair(
            AuthCloudApiRegisterMethodHandler(),
            AuthCloudApiRegisterMessage.serializer()
        ),
        AUTHENTICATE.methodName to Pair(
            AuthenticationMethodHandler(),
            AuthenticationMessage.serializer()
        ),
        AUTHENTICATOR_AAID.methodName to Pair(
            AuthenticatorAaidMethodHandler(),
            AuthenticatorAaidMessage.serializer()
        ),
        CANCEL.methodName to Pair(
            CancelMethodHandler(),
            CancelMessage.serializer()
        ),
        CANCEL_AUTHENTICATION.methodName to Pair(
            CancelMethodHandler(),
            CancelMessage.serializer()
        ),
        DEREGISTER.methodName to Pair(
            DeregistrationMethodHandler(),
            DeregistrationMessage.serializer()
        ),
        DEVICE_INFORMATION_CHANGE.methodName to Pair(
            DeviceInformationChangeMethodHandler(),
            DeviceInformationChangeMessage.serializer()
        ),
        IS_POLICY_COMPLIANT.methodName to Pair(
            IsPolicyCompliantMethodHandler(),
            IsPolicyCompliantMessage.serializer()
        ),
        LISTEN_FOR_OS_CREDENTIALS.methodName to Pair(
            ListenForOsCredentialsMethodHandler(),
            ListenForOsCredentialsMessage.serializer()
        ),
        LOCAL_ACCOUNTS.methodName to Pair(
            LocalAccountsMethodHandler(),
            LocalAccountsMessage.serializer()
        ),
        LOCAL_AUTHENTICATORS.methodName to Pair(
            LocalAuthenticatorsMethodHandler(),
            LocalAuthenticatorsMessage.serializer()
        ),
        LOCAL_DELETE_AUTHENTICATOR.methodName to Pair(
            LocalDeleteAuthenticatorMethodHandler(),
            LocalDeleteAuthenticatorMessage.serializer()
        ),
        LOCAL_DEVICE_INFORMATION.methodName to Pair(
            LocalDeviceInformationMethodHandler(),
            LocalDeviceInformationMessage.serializer()
        ),
        OOB_AUTHENTICATE.methodName to Pair(
            OobAuthenticationMethodHandler(),
            OobAuthenticationMessage.serializer()
        ),
        OOB_PAYLOAD_DECODE.methodName to Pair(
            OobPayloadDecodeMethodHandler(),
            OobPayloadDecodeMessage.serializer()
        ),
        OOB_OPERATION.methodName to Pair(
            OobOperationMethodHandler(),
            OobOperationMessage.serializer()
        ),
        OOB_REGISTER.methodName to Pair(
            OobRegistrationMethodHandler(),
            OobRegistrationMessage.serializer()
        ),
        PAUSE_LISTENING.methodName to Pair(
            PauseListeningMethodHandler(),
            PauseListeningMessage.serializer()
        ),
        PIN_CHANGE.methodName to Pair(
            PinChangeMethodHandler(),
            PinChangeMessage.serializer()
        ),
        PIN_ENROLL.methodName to Pair(
            PinEnrollMethodHandler(),
            PinEnrollMessage.serializer()
        ),
        PINS_CHANGE.methodName to Pair(
            PinsChangeMethodHandler(),
            PinsChangeMessage.serializer()
        ),
        PIN_VERIFY.methodName to Pair(
            PinVerifyMethodHandler(),
            PinVerifyMessage.serializer()
        ),
        REGISTER.methodName to Pair(
            RegistrationMethodHandler(),
            RegistrationMessage.serializer()
        ),
        RESUME_LISTENING.methodName to Pair(
            ResumeListeningMethodHandler(),
            ResumeListeningMessage.serializer()
        ),

    )
}
