/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.onsuccess

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.OnSuccessMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider.EmptyAuthorizationProvider
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandPayload

class DefaultOnSuccessImpl(
    private val operationId: String,
    private val method: ReactMethodName
) {
    fun onSuccess(
        authorizationProvider: AuthorizationProvider? = null,
        outOfBandPayload: OutOfBandPayload? = null
    ) {
        val onSuccessMessage = OnSuccessMessage(operationId)

        authorizationProvider?.let {
            // EmptyAuthorizationProvider is not supported by the React plugin
            if (it !is EmptyAuthorizationProvider) {
                onSuccessMessage.authorizationProvider = authorizationProvider
            }
        }

        outOfBandPayload?.let {
            onSuccessMessage.outOfBandPayload = outOfBandPayload.toDto()
        }

        MethodChannelHandler.resolve(method, onSuccessMessage)
        OperationCache.removeOperation(operationId)
    }
}
