/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.CookieSessionProviderImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.EmptySessionProviderImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.JwtSessionProviderImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.SessionProviderType
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.authorization.SessionProvider
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.*

object SessionProviderSerializer : TypedSerializer<SessionProvider>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<SessionProvider>()

    override fun serialize(encoder: Encoder, value: SessionProvider) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is SessionProvider.CookieSessionProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        SessionProviderType.COOKIE.type,
                        CookieSessionProviderImpl.serializer()
                    )
                }
                is SessionProvider.EmptySessionProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        SessionProviderType.EMPTY.type,
                        EmptySessionProviderImpl.serializer()
                    )
                }
                is SessionProvider.JwtSessionProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        SessionProviderType.JWT.type,
                        JwtSessionProviderImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given session provider is not supported.")
            }
        }
    }

    override fun deserialize(decoder: Decoder): SessionProvider {
        return decoder.decodeStructure(descriptor) {
            var providerType: String? = null
            var provider: SessionProvider = EmptySessionProviderImpl()
            loop@ while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    CompositeDecoder.DECODE_DONE -> break@loop
                    0 -> {
                        providerType = decodeStringElement(descriptor, 0)
                            .replaceFirstChar(Char::titlecase)
                    }
                    1 -> {
                        provider = when (providerType) {
                            SessionProviderType.COOKIE.type -> {
                                decodeSubType(
                                    descriptor,
                                    CookieSessionProviderImpl.serializer()
                                )
                            }
                            SessionProviderType.JWT.type -> {
                                decodeSubType(
                                    descriptor,
                                    JwtSessionProviderImpl.serializer()
                                )
                            }
                            else -> throw SerializationException("Unexpected session provider $providerType")
                        }
                    }
                    else -> throw SerializationException("Unexpected index $index")
                }
            }

            provider
        }
    }
}
