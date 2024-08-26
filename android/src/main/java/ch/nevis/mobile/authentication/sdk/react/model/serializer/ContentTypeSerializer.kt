/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.sdk.api.operation.outofband.ContentType
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerializationException
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

class ContentTypeSerializer : KSerializer<ContentType> {
    override val descriptor: SerialDescriptor
        get() = String.serializer().descriptor

    override fun serialize(encoder: Encoder, value: ContentType) {
        encoder.encodeString(value.toMimeType())
    }

    override fun deserialize(decoder: Decoder): ContentType {
        return when (decoder.decodeString()) {
            ContentType.JOSE.toMimeType() -> ContentType.JOSE
            ContentType.JSON.toMimeType() -> ContentType.JSON
            else -> throw SerializationException("Unsupported content type.")
        }
    }
}
