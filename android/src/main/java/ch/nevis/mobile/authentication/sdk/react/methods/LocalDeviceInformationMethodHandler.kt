/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.LocalDeviceInformationOutMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class LocalDeviceInformationMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val localData = client.localData()
        val deviceInformation = localData.deviceInformation().orElse(null)
        val resultMessage = LocalDeviceInformationOutMessage(
            channelInMessage.operationId,
            deviceInformation
        )

        MethodChannelHandler.resolve(ReactMethodName.LOCAL_DEVICE_INFORMATION, resultMessage)
    }
}
