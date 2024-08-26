/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.LocalAuthenticatorsOutMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class LocalAuthenticatorsMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val resultMessage = LocalAuthenticatorsOutMessage(
            channelInMessage.operationId,
            client.localData().authenticators().map { it.toDto(null) }.toList()
        )

        MethodChannelHandler.resolve(ReactMethodName.LOCAL_AUTHENTICATORS, resultMessage)
    }
}
