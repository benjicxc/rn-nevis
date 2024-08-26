/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.sdk.api.authorization.Jwt
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

object JwtSerializer : KSerializer<Jwt> {
    override val descriptor: SerialDescriptor
        get() = PrimitiveSerialDescriptor(Jwt::class.java.simpleName, PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Jwt) {
        encoder.encodeString(value.toString())
    }

    override fun deserialize(decoder: Decoder): Jwt {
        return Jwt.create(decoder.decodeString())
    }
}
