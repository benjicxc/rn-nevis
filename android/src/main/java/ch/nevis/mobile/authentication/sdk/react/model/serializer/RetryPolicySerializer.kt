/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.ConstantRetryPolicyImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.ExponentialRetryPolicyImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.NoRetryPolicyImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.RetryPolicyType
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.RetryPolicy
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.CompositeDecoder.Companion.DECODE_DONE
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.encoding.decodeStructure
import kotlinx.serialization.encoding.encodeStructure

object RetryPolicySerializer: TypedSerializer<RetryPolicy>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<RetryPolicy>()

    override fun serialize(encoder: Encoder, value: RetryPolicy) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is RetryPolicy.NoRetry -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        RetryPolicyType.NO_RETRY.type,
                        NoRetryPolicyImpl.serializer()
                    )
                }
                is RetryPolicy.Constant -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        RetryPolicyType.CONSTANT.type,
                        ConstantRetryPolicyImpl.serializer()
                    )
                }
                is RetryPolicy.Exponential -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        RetryPolicyType.EXPONENTIAL.type,
                        ExponentialRetryPolicyImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given retry policy is not supported.")
            }
        }
    }

    override fun deserialize(decoder: Decoder): RetryPolicy {
        return decoder.decodeStructure(descriptor) {
            var policyType: String? = null
            var policy: RetryPolicy? = null
            loop@ while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    DECODE_DONE -> break@loop
                    0 -> {
                        policyType = decodeStringElement(descriptor, 0)
                            .replaceFirstChar(Char::titlecase)
                    }
                    1 -> {
                        policy = when (policyType) {
                            RetryPolicyType.NO_RETRY.type -> {
                                decodeSubType(
                                    descriptor,
                                    NoRetryPolicyImpl.serializer()
                                )
                            }
                            RetryPolicyType.CONSTANT.type -> {
                                decodeSubType(
                                    descriptor,
                                    ConstantRetryPolicyImpl.serializer()
                                )
                            }
                            RetryPolicyType.EXPONENTIAL.type -> {
                                decodeSubType(
                                    descriptor,
                                    ExponentialRetryPolicyImpl.serializer()
                                )
                            }
                            else -> throw SerializationException("Unexpected retry policy $policyType")
                        }
                    }
                    else -> throw SerializationException("Unexpected index $index")
                }
            }

            if (policy == null) throw SerializationException("Failed to decode given retry policy.")
            policy
        }
    }
}
