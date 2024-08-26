/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.*
import ch.nevis.mobile.sdk.api.localdata.UserEnrollment
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.*

object UserEnrollmentSerializer : TypedSerializer<UserEnrollment>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<UserEnrollment>()

    override fun serialize(encoder: Encoder, value: UserEnrollment) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is UserEnrollment.OsUserEnrollment -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        UserEnrollmentType.OS.type,
                        OsUserEnrollmentImpl.serializer()
                    )
                }
                is UserEnrollment.SdkUserEnrollment -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        UserEnrollmentType.SDK.type,
                        SdkUserEnrollmentImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given user enrollment is not supported.")
            }
        }
    }

    override fun deserialize(decoder: Decoder): UserEnrollment {
        return decoder.decodeStructure(descriptor) {
            var userEnrollmentType: String? = null
            var userEnrollment: UserEnrollment? = null
            loop@ while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    CompositeDecoder.DECODE_DONE -> break@loop
                    0 -> {
                        userEnrollmentType = decodeStringElement(descriptor, 0)
                            .replaceFirstChar(Char::titlecase)
                    }
                    1 -> {
                        userEnrollment = when (userEnrollmentType) {
                            UserEnrollmentType.OS.type -> {
                                decodeSubType(
                                    descriptor,
                                    OsUserEnrollmentImpl.serializer()
                                )
                            }
                            UserEnrollmentType.SDK.type -> {
                                decodeSubType(
                                    descriptor,
                                    SdkUserEnrollmentImpl.serializer()
                                )
                            }
                            else -> throw SerializationException("Unexpected user enrollment $userEnrollmentType")
                        }
                    }
                    else -> throw SerializationException("Unexpected index $index")
                }
            }

            if (userEnrollment == null) throw SerializationException("Failed to decode given user enrollment.")
            userEnrollment
        }
    }
}