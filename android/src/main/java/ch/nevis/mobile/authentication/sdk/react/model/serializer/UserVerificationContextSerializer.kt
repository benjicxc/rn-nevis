/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.*
import ch.nevis.mobile.sdk.api.operation.userverification.BiometricUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodeUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.PinUserVerificationContext
import ch.nevis.mobile.sdk.api.operation.userverification.UserVerificationContext
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.encoding.encodeStructure

class UserVerificationContextSerializer : TypedSerializer<UserVerificationContext>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<UserVerificationContext>()

    override fun serialize(encoder: Encoder, value: UserVerificationContext) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is PinUserVerificationContextImpl -> {
                    encodeSubType(
                        descriptor,
                        value,
                        PinUserVerificationContext::class.java.simpleName,
                        PinUserVerificationContextImpl.serializer()
                    )
                }
                is BiometricUserVerificationContextImpl -> {
                    encodeSubType(
                        descriptor,
                        value,
                        BiometricUserVerificationContext::class.java.simpleName,
                        BiometricUserVerificationContextImpl.serializer()
                    )
                }
                is DevicePasscodeUserVerificationContextImpl -> {
                    encodeSubType(
                        descriptor,
                        value,
                        DevicePasscodeUserVerificationContext::class.java.simpleName,
                        DevicePasscodeUserVerificationContextImpl.serializer()
                    )
                }
                is FingerprintUserVerificationContextImpl -> {
                    encodeSubType(
                        descriptor,
                        value,
                        FingerprintUserVerificationContext::class.java.simpleName,
                        FingerprintUserVerificationContextImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given user verification context is not supported.")
            }
        }
    }
}
