/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.DeviceInformationChangeOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.DeviceInformationChangeMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class DeviceInformationChangeMethodHandler : MethodHandler() {
    override fun execute(
        client: MobileAuthenticationClient,
        channelInMessage: ChannelInMessage,
    ) {
        val message = validate<DeviceInformationChangeMessage>(channelInMessage)
        val operation = DeviceInformationChangeOperation(message.operationId)
        OperationCache.createOperation(message.operationId, operation)

        val deviceInformationChange = client.operations().deviceInformationChange()
        message.name?.let {
            deviceInformationChange.name(it)
        }

        message.fcmRegistrationToken?.let {
            deviceInformationChange.name(it)
        }

        message.disablePushNotifications?.let {
            if (it) {
                deviceInformationChange.disablePushNotifications()
            }
        }

        message.retryPolicy?.let {
            deviceInformationChange.retryPolicy(it)
        }

        message.requestHeaders?.let {
            deviceInformationChange.requestHeaders(it)
        }

        if (message.onSuccessProvided) {
            deviceInformationChange.onSuccess {
                operation.onSuccess(null)
            }
        }

        if (message.onErrorProvided) {
            deviceInformationChange.onError(operation.onError)
        }

        deviceInformationChange.execute()
    }
}
