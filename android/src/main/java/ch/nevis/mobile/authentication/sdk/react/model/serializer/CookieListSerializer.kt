/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.sdk.api.authorization.Cookie
import kotlinx.serialization.KSerializer
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

object CookieListSerializer : KSerializer<List<Cookie>> {
    private val serializer = ListSerializer(CookieSerializer)

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: List<Cookie>) {
        encoder.encodeSerializableValue(serializer, value)
    }

    override fun deserialize(decoder: Decoder): List<Cookie> {
        return decoder.decodeSerializableValue(serializer)
    }
}
