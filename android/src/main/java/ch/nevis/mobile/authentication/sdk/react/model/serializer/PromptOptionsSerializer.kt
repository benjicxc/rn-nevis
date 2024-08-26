/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.BiometricPromptOptionsImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.DevicePasscodePromptOptionsImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.PromptOptions
import ch.nevis.mobile.authentication.sdk.react.model.sdk.PromptOptionsType
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.userverification.BiometricPromptOptions
import ch.nevis.mobile.sdk.api.operation.userverification.DevicePasscodePromptOptions
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.CompositeDecoder
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.encoding.decodeStructure
import kotlinx.serialization.encoding.encodeStructure

object PromptOptionsSerializer : TypedSerializer<PromptOptions>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<PromptOptions>()

    override fun serialize(encoder: Encoder, value: PromptOptions) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is BiometricPromptOptions -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PromptOptionsType.BIOMETRIC.type,
                        BiometricPromptOptionsImpl.serializer()
                    )
                }

                is DevicePasscodePromptOptions -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PromptOptionsType.DEVICE_PASSCODE.type,
                        DevicePasscodePromptOptionsImpl.serializer()
                    )
                }

                else -> throw SerializationException("The given prompt options is not supported.")
            }
        }
    }

    override fun deserialize(decoder: Decoder): PromptOptions {
        return decoder.decodeStructure(descriptor) {
            var promptOptionsType: String? = null
            var promptOptions: PromptOptions? = null
            loop@ while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    CompositeDecoder.DECODE_DONE -> break@loop
                    0 -> {
                        promptOptionsType = decodeStringElement(descriptor, 0)
                            .replaceFirstChar(Char::titlecase)
                    }

                    1 -> {
                        promptOptions = when (promptOptionsType) {
                            PromptOptionsType.BIOMETRIC.type -> {
                                decodeSubType(
                                    descriptor,
                                    BiometricPromptOptionsImpl.serializer()
                                )
                            }

                            PromptOptionsType.DEVICE_PASSCODE.type -> {
                                decodeSubType(
                                    descriptor,
                                    DevicePasscodePromptOptionsImpl.serializer()
                                )
                            }

                            else -> throw SerializationException("Unexpected prompt options $promptOptionsType")
                        }
                    }

                    else -> throw SerializationException("Unexpected index $index")
                }
            }
            promptOptions ?: throw SerializationException("Failed to decode given prompt options.")
        }
    }
}
