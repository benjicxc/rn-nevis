/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

abstract class MethodHandler {
    abstract fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage)

    protected inline fun <reified T : ChannelInMessage> validate(message: ChannelInMessage): T {
        if (message is T) {
            return message
        }
        throw IllegalArgumentException("Invalid message parameter.")
    }
}

//fun MethodChannel.Result.deleteAuthenticatorErrorMessage(
//    deleteAuthenticatorError: DeleteAuthenticatorError,
//    exception: Exception
//) {
//    error(
//        PlatformChannelError.DELETE_AUTHENTICATOR.errorName,
//        exception.localizedMessage,
//        mapOf(
//            ChannelErrorKey.TYPE.keyName to deleteAuthenticatorError.type,
//            ChannelErrorKey.DATA.keyName to mapOf(
//                ChannelErrorKey.DESCRIPTION.keyName to exception.localizedMessage
//            )
//        )
//    )
//}
