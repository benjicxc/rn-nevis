/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.VerifyUser
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.PinVerifyMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class PinVerifyMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage
    ) {
        val message = validate<PinVerifyMessage>(channelInMessage)
        val operation = OperationCache.getOperation<UserInteractionOperation>(message.operationId)
        val currentState = operation.state as? VerifyUser
            ?: throw IllegalStateException("verifyPin() can only be called during user verification!")
        currentState.verifyPin(message.pin)
        MethodChannelHandler.resolve(ReactMethodName.PIN_VERIFY, null)
    }
}
