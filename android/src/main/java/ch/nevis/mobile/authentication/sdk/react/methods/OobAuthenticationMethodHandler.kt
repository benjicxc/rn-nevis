/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandAuthenticationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.OobAuthenticationMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class OobAuthenticationMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val message = validate<OobAuthenticationMessage>(channelInMessage)
        val operation = OperationCache.getOperation<OutOfBandAuthenticationOperation>(message.operationId)

        val authentication = operation.authentication
        message.requestHeaders?.let {
            authentication.requestHeaders(it)
        }

        if (message.accountSelectorProvided) {
            authentication.accountSelector(operation.accountSelector)
        }

        if (message.authenticatorSelectorProvided) {
            authentication.authenticatorSelector(operation.authenticatorSelector)
        }

        if (message.pinUserVerifierProvided) {
            authentication.pinUserVerifier(operation.pinUserVerifier)
        }

        if (message.biometricUserVerifierProvided) {
            authentication.biometricUserVerifier(operation.biometricUserVerifier)
        }

        if (message.devicePasscodeUserVerifierProvided) {
            authentication.devicePasscodeUserVerifier(operation.devicePasscodeUserVerifier)
        }

        if (message.fingerprintUserVerifierProvided) {
            authentication.fingerprintUserVerifier(operation.fingerprintUserVerifier)
        }

        if (message.onSuccessProvided) {
            authentication.onSuccess(operation.onSuccess)
        }

        if (message.onErrorProvided) {
            authentication.onError(operation.onError)
        }

        authentication.execute()
        OperationCache.updateOperation(message.operationId, operation)
    }
}
