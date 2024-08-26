/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.UserInteractionState
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.IsPolicyCompliantMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.IsPolicyCompliantOutMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class IsPolicyCompliantMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<IsPolicyCompliantMessage>(channelInMessage)
        val currentState =
            OperationCache.getOperation<UserInteractionOperation>(message.operationId).state as? UserInteractionState
                ?: throw IllegalStateException("isPolicyCompliant() can only be called during selectAuthenticator or selectAccount!")
        val resultMessage =	IsPolicyCompliantOutMessage(
            message.operationId,
            currentState.isPolicyCompliant(
                message.aaid,
                message.username
            )
        )

        MethodChannelHandler.resolve(ReactMethodName.IS_POLICY_COMPLIANT, resultMessage)
    }
}
