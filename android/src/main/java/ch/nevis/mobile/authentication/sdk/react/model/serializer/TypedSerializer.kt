/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.descriptors.element
import kotlinx.serialization.encoding.CompositeDecoder
import kotlinx.serialization.encoding.CompositeEncoder
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

abstract class TypedSerializer<T> : KSerializer<T> {
    inline fun <reified D> createDescriptor(): SerialDescriptor {
        return buildClassSerialDescriptor(D::class.java.simpleName) {
            element<String>("type")
            element<D>("data")
        }
    }

    override fun serialize(encoder: Encoder, value: T) {
        throw NotImplementedError()
    }

    override fun deserialize(decoder: Decoder): T {
        throw NotImplementedError()
    }
}

fun <I : Any> CompositeEncoder.encodeSubType(
    descriptor: SerialDescriptor,
    value: I,
    baseClassName: String,
    serializer: KSerializer<I>,
) {
    encodeStringElement(descriptor, 0, baseClassName)
    encodeSerializableElement(
        descriptor,
        1,
        serializer,
        value
    )
}

fun <I : Any> CompositeDecoder.decodeSubType(
    descriptor: SerialDescriptor,
    deserializer: KSerializer<I>,
): I {
    return decodeSerializableElement(
        descriptor,
        1,
        deserializer)
}
