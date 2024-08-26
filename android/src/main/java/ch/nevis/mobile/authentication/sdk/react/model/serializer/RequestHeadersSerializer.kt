/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.RequestHeadersImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

object RequestHeadersSerializer : KSerializer<RequestHeaders> {
    private val serializer = RequestHeadersImpl.serializer()

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: RequestHeaders) {
        encoder.encodeSerializableValue(serializer, value.toDto())
    }

    override fun deserialize(decoder: Decoder): RequestHeaders {
        val requestHeadersImpl = decoder.decodeSerializableValue(serializer)
        return RequestHeaders.create(*requestHeadersImpl.namesAndValues.toTypedArray())
    }
}
