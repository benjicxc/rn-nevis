/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.SelectAuthenticator
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.AuthenticatorAaidMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class AuthenticatorAaidMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage
    ) {
        val message = validate<AuthenticatorAaidMessage>(channelInMessage)
        val operation = OperationCache.getOperation<UserInteractionOperation>(message.operationId)
        val currentState = operation.state as? SelectAuthenticator
            ?: throw IllegalStateException("Operation state is missing or not a Select Authenticator state!")
        currentState.authenticatorSelectionHandler?.aaid(message.aaid)
        MethodChannelHandler.resolve(ReactMethodName.AUTHENTICATOR_AAID, null)
    }
}
