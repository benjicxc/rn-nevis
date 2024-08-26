/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelError
import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelErrorData
import ch.nevis.mobile.authentication.sdk.react.model.error.DeleteAuthenticatorError
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.LocalDeleteAuthenticatorMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.ErrorMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class LocalDeleteAuthenticatorMethodHandler : MethodHandler() {
	override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
		val message = validate<LocalDeleteAuthenticatorMessage>(channelInMessage)

		try {
			if (message.aaid != null) {
				client.localData().deleteAuthenticator(message.username, message.aaid)
			} else {
				client.localData().deleteAuthenticator(message.username)
			}
			MethodChannelHandler.resolve(ReactMethodName.LOCAL_DELETE_AUTHENTICATOR, null)
		} catch (e: IllegalArgumentException) {
			val errorMessage = ErrorMessage(
				message.operationId,
				ChannelError(
					DeleteAuthenticatorError.INVALID_AAID.type,
					ChannelErrorData(
						description = e.localizedMessage
					)
				)
			)
			MethodChannelHandler.reject(ReactMethodName.LOCAL_DELETE_AUTHENTICATOR, errorMessage)
		} catch (e: Exception) {
			val errorMessage = ErrorMessage(
				message.operationId,
				ChannelError(
					DeleteAuthenticatorError.UNKNOWN.type,
					ChannelErrorData(
						description = e.localizedMessage
					)
				)
			)
			MethodChannelHandler.reject(ReactMethodName.LOCAL_DELETE_AUTHENTICATOR, errorMessage)
		}
	}
}
