/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandRegistrationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.OobRegistrationMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class OobRegistrationMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val message = validate<OobRegistrationMessage>(channelInMessage)
        val operation = OperationCache.getOperation<OutOfBandRegistrationOperation>(message.operationId)
        operation.update(message.operationId, message.pinPolicy)

        val registration = operation.registration
        message.deviceInformation?.let {
            registration.deviceInformation(it)
        }

        message.allowClass2Sensors?.let {
            registration.allowClass2Sensors(it)
        }

        message.allowDevicePasscodeAsFallback?.let {
            registration.allowDevicePasscodeAsFallback(it)
        }

        message.invalidateOnNewOsBiometrics?.let {
            registration.invalidateOnNewOsBiometrics(it)
        }

        message.requestHeaders?.let {
            registration.requestHeaders(it)
        }

        if (message.authenticatorSelectorProvided) {
            registration.authenticatorSelector(operation.authenticatorSelector)
        }

        if (message.pinEnrollerProvided) {
            registration.pinEnroller(operation.pinEnroller)
        }

        if (message.biometricUserVerifierProvided) {
            registration.biometricUserVerifier(operation.biometricUserVerifier)
        }

        if (message.devicePasscodeUserVerifierProvided) {
            registration.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

        if (message.fingerprintUserVerifierProvided) {
            registration.fingerprintUserVerifier(operation.fingerprintUserVerifier)
        }

        if (message.onSuccessProvided) {
            registration.onSuccess {
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            registration.onError(operation.onError)
        }

        registration.execute()
        OperationCache.updateOperation(message.operationId, operation)
    }
}
