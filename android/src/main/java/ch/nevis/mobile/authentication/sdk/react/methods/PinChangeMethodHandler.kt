/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.PinChangeOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.PinChangeMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class PinChangeMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<PinChangeMessage>(channelInMessage)
        val operation = PinChangeOperation(message.operationId, message.pinPolicy)
        OperationCache.createOperation(message.operationId, operation)

        val pinChange = client.operations().pinChange()
        message.username?.let {
            pinChange.username(it)
        }

        if (message.pinChangerProvided) {
            pinChange.pinChanger(operation.pinChanger)
        }

        if (message.onSuccessProvided) {
            pinChange.onSuccess {
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            pinChange.onError(operation.onError)
        }

        pinChange.execute()
    }
}
