/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.CookieImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.authorization.Cookie
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import java.net.URI

object CookieSerializer : KSerializer<Cookie> {
    private val serializer = CookieImpl.serializer()

    override val descriptor: SerialDescriptor = serializer.descriptor

    override fun serialize(encoder: Encoder, value: Cookie) {
        encoder.encodeSerializableValue(serializer, value.toDto())
    }

    override fun deserialize(decoder: Decoder): Cookie {
        val cookieImpl = decoder.decodeSerializableValue(serializer)
        return Cookie.create(URI.create(cookieImpl.uri), cookieImpl.properties)
    }
}
