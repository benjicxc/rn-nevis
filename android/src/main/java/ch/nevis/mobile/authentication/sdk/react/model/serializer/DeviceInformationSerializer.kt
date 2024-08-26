/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.DeviceInformationImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.localdata.DeviceInformation
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

object DeviceInformationSerializer : KSerializer<DeviceInformation> {
    private val serializer = DeviceInformationImpl.serializer()

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: DeviceInformation) {
        encoder.encodeSerializableValue(serializer, value.toDto())
    }

    override fun deserialize(decoder: Decoder): DeviceInformation {
        val deviceInformationImpl = decoder.decodeSerializableValue(serializer)
        return DeviceInformation.builder()
            .name(deviceInformationImpl.name)
            .fcmRegistrationToken(deviceInformationImpl.fcmRegistrationToken)
            .build()
    }
}
