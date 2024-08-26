/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.operation.InitializationOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.InitClientMessage
import ch.nevis.mobile.authentication.sdk.react.util.ApplicationProvider
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientInitializer

class InitClientMethodHandler {
    fun execute(message: InitClientMessage, onSuccess: (MobileAuthenticationClient?) -> Unit) {
        val currentApplication = ApplicationProvider.application
            ?: throw IllegalStateException("Cannot initialize sdk as the provided application is null.")
        val operation = InitializationOperation(message.operationId)

        val clientInitializer = MobileAuthenticationClientInitializer.initializer()
            .application(currentApplication)
        message.configuration?.let {
            clientInitializer.configuration(it)
        }

        if (message.onSuccessProvided) {
            clientInitializer.onSuccess { mobileAuthenticationClient ->
                onSuccess(mobileAuthenticationClient)
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            clientInitializer.onError(operation.onError)
        }

        clientInitializer.execute()
    }
}
