/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.serializer.DeviceInformationSerializer
import ch.nevis.mobile.sdk.api.localdata.DeviceInformation
import kotlinx.serialization.Serializable

@Serializable
data class LocalDeviceInformationOutMessage(
    override val operationId: String,
    @Serializable(with = DeviceInformationSerializer::class)
    val deviceInformation: DeviceInformation? = null
) : ChannelOutMessage()
