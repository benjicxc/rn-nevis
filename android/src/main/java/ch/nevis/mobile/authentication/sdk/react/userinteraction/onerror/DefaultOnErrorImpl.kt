/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.onerror

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.ErrorMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toChannelError
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError

class DefaultOnErrorImpl(
    private val operationId: String,
    private val method: ReactMethodName
) {
    fun onError(error: MobileAuthenticationClientError?) {
        val message = ErrorMessage(operationId, error?.toChannelError())
        MethodChannelHandler.reject(method, message)
    }
}
