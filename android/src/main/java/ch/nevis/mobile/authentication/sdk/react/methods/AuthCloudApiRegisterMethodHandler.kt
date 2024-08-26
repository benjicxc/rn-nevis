/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.AuthCloudApiRegistrationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.AuthCloudApiRegisterMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class AuthCloudApiRegisterMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val message = validate<AuthCloudApiRegisterMessage>(channelInMessage)
        val operation = AuthCloudApiRegistrationOperation(message.operationId, message.pinPolicy)
        OperationCache.createOperation(message.operationId, operation)

        val authCloudApiRegistration = client.operations().authCloudApiRegistration()
        message.deviceInformation?.let {
            authCloudApiRegistration.deviceInformation(it)
        }

        message.enrollResponse?.let {
            authCloudApiRegistration.enrollResponse(it)
        }

        message.appLinkUri?.let {
            authCloudApiRegistration?.appLinkUri(it)
        }

        message.allowClass2Sensors?.let {
            authCloudApiRegistration.allowClass2Sensors(it)
        }

        message.allowDevicePasscodeAsFallback?.let {
            authCloudApiRegistration.allowDevicePasscodeAsFallback(it)
        }

        message.invalidateOnNewOsBiometrics?.let {
            authCloudApiRegistration.invalidateOnNewOsBiometrics(it)
        }

        message.requestHeaders?.let {
            authCloudApiRegistration.requestHeaders(it)
        }

        if (message.authenticatorSelectorProvided) {
            authCloudApiRegistration.authenticatorSelector(operation.authenticatorSelector)
        }

        if (message.pinEnrollerProvided) {
            authCloudApiRegistration.pinEnroller(operation.pinEnroller)
        }

        if (message.biometricUserVerifierProvided) {
            authCloudApiRegistration.biometricUserVerifier(operation.biometricUserVerifier)
        }

        if (message.devicePasscodeUserVerifierProvided) {
            authCloudApiRegistration.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

        if (message.fingerprintUserVerifierProvided) {
            authCloudApiRegistration.fingerprintUserVerifier(operation.fingerprintUserVerifier)
        }

        if (message.onSuccessProvided) {
            authCloudApiRegistration.onSuccess {
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            authCloudApiRegistration.onError(operation.onError)
        }

        authCloudApiRegistration.execute()
    }
}
