/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.DeregistrationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.DeregistrationMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class DeregistrationMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<DeregistrationMessage>(channelInMessage)
        val operation = DeregistrationOperation(message.operationId)
        OperationCache.createOperation(message.operationId, operation)

        val deregistration = client.operations().deregistration()
        message.username?.let {
            deregistration.username(it)
        }

        message.aaid?.let {
            deregistration.aaid(it)
        }

        message.authorizationProvider?.let {
            deregistration.authorizationProvider(it)
        }

        message.requestHeaders?.let {
            deregistration.requestHeaders(it)
        }

        if (message.onSuccessProvided) {
            deregistration.onSuccess {
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            deregistration.onError(operation.onError)
        }

        deregistration.execute()
    }
}
