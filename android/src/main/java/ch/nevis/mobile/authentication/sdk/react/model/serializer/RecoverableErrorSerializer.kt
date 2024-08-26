/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.*
import ch.nevis.mobile.sdk.api.operation.RecoverableError
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeRecoverableError
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentError
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerificationError
import ch.nevis.mobile.sdk.api.operation.userverification.PinUserVerificationError
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.encoding.encodeStructure

class RecoverableErrorSerializer : TypedSerializer<RecoverableError>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<RecoverableError>()

    override fun serialize(encoder: Encoder, value: RecoverableError) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is PinEnrollmentError.InvalidPinFormat -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinEnrollmentError.InvalidPinFormat::class.java.simpleName,
                        PinEnrollmentInvalidPinFormatImpl.serializer()
                    )
                }
                is PinChangeRecoverableError.InvalidPin -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinChangeRecoverableError.InvalidPin::class.java.simpleName,
                        PinChangeInvalidPinImpl.serializer()
                    )
                }
                is PinChangeRecoverableError.InvalidPinFormat -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinChangeRecoverableError.InvalidPinFormat::class.java.simpleName,
                        PinChangeInvalidPinFormatImpl.serializer()
                    )
                }
                is PinChangeRecoverableError.OldPinEqualsNewPin -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinChangeRecoverableError.OldPinEqualsNewPin::class.java.simpleName,
                        PinChangeOldPinEqualsNewPinImpl.serializer()
                    )
                }
                is FingerprintUserVerificationError -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        FingerprintUserVerificationError::class.java.simpleName,
                        FingerprintUserVerificationErrorImpl.serializer()
                    )
                }
                is PinUserVerificationError.InvalidPin -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinUserVerificationError.InvalidPin::class.java.simpleName,
                        PinUserVerificationInvalidPinImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given recoverable error is not supported.")
            }
        }
    }
}
