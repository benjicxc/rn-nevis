/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.AuthenticationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.AuthenticationMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class AuthenticationMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage
    ) {
        val message = validate<AuthenticationMessage>(channelInMessage)
        val operation = AuthenticationOperation(message.operationId, null)
        OperationCache.createOperation(message.operationId, operation)

        val authentication = client.operations().authentication()
        message.username?.let {
            authentication.username(it)
        }

        message.sessionProvider?.let {
            authentication.sessionProvider(it)
        }

        message.retryPolicy?.let {
            authentication.retryPolicyObtainingAuthorizationProvider(it)
        }

        message.requestHeaders?.let {
            authentication.requestHeaders(it)
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
    }
}
