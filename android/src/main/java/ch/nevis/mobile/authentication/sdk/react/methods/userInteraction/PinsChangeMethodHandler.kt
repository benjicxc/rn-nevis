/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.PinChangeOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.PinChange
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.PinsChangeMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class PinsChangeMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<PinsChangeMessage>(channelInMessage)
        val operation = OperationCache.getOperation<PinChangeOperation>(message.operationId)
        val state = operation.state as? PinChange
            ?: throw IllegalStateException("Operation state is missing or not a Pin change state!")
        val oldPin = message.oldPin?.toCharArray()
        val newPin = message.newPin?.toCharArray()
        state.pinChangeHandler?.pins(oldPin, newPin)
        MethodChannelHandler.resolve(ReactMethodName.PINS_CHANGE, null)
    }
}
