/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods.userInteraction

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.SelectAccount
import ch.nevis.mobile.authentication.sdk.react.methods.MethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.AccountUsernameMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class AccountUsernameMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage
    ) {
        val message = validate<AccountUsernameMessage>(channelInMessage)
        val operation = OperationCache.getOperation<UserInteractionOperation>(message.operationId)
        val state = operation.state as? SelectAccount
            ?: throw IllegalStateException("UserInteractionState is missing or not SelectAccount for operation!")
        state.accountSelectionHandler?.username(message.username)
        MethodChannelHandler.resolve(ReactMethodName.ACCOUNT_USERNAME, null)
    }
}
