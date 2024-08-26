/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.*
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider.*
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.*
import kotlinx.serialization.encoding.CompositeDecoder.Companion.DECODE_DONE

object AuthorizationProviderSerializer : TypedSerializer<AuthorizationProvider>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<AuthorizationProvider>()

    override fun serialize(encoder: Encoder, value: AuthorizationProvider) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is CookieAuthorizationProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        AuthorizationProviderType.COOKIE.type,
                        CookieAuthorizationProviderImpl.serializer()
                    )
                }
                is EmptyAuthorizationProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        AuthorizationProviderType.EMPTY.type,
                        EmptyAuthorizationProviderImpl.serializer()
                    )
                }
                is JwtAuthorizationProvider -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        AuthorizationProviderType.JWT.type,
                        JwtAuthorizationProviderImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given authorization provider is not supported.")
            }
        }
    }

    override fun deserialize(decoder: Decoder): AuthorizationProvider {
        return decoder.decodeStructure(descriptor) {
            var providerType: String? = null
            var provider: AuthorizationProvider = EmptyAuthorizationProviderImpl()
            loop@ while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    DECODE_DONE -> break@loop
                    0 -> {
                        providerType = decodeStringElement(descriptor, 0)
                            .replaceFirstChar(Char::titlecase)
                    }
                    1 -> {
                        provider = when (providerType) {
                            AuthorizationProviderType.COOKIE.type -> {
                                decodeSubType(
                                    descriptor,
                                    CookieAuthorizationProviderImpl.serializer()
                                )
                            }
                            AuthorizationProviderType.JWT.type -> {
                                decodeSubType(
                                    descriptor,
                                    JwtAuthorizationProviderImpl.serializer()
                                )
                            }
                            else -> throw SerializationException("Unexpected authorization provider $providerType")
                        }
                    }
                    else -> throw SerializationException("Unexpected index $index")
                }
            }

            provider
        }
    }
}
