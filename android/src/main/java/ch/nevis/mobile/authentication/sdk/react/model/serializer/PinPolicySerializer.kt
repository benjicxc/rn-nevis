/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.PinPolicyImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

object PinPolicySerializer : KSerializer<PinPolicy> {
    private val serializer = PinPolicyImpl.serializer()

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: PinPolicy) {
        encoder.encodeSerializableValue(serializer, value.toDto())
    }

    override fun deserialize(decoder: Decoder): PinPolicy {
        val pinPolicyImpl = decoder.decodeSerializableValue(serializer)
        return PinPolicy.builder()
            .minLength(pinPolicyImpl.minLength)
            .maxLength(pinPolicyImpl.maxLength)
            .build()
    }
}
