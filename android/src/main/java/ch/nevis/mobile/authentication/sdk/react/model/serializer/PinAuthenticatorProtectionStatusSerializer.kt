/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.serializer

import ch.nevis.mobile.authentication.sdk.react.model.sdk.LastAttemptFailedImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.LockedOutImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.UnlockedImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.pin.PinAuthenticatorProtectionStatus
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.encoding.encodeStructure

class PinAuthenticatorProtectionStatusSerializer :
    TypedSerializer<PinAuthenticatorProtectionStatus>() {
    override val descriptor: SerialDescriptor
        get() = createDescriptor<PinAuthenticatorProtectionStatus>()

    override fun serialize(encoder: Encoder, value: PinAuthenticatorProtectionStatus) {
        encoder.encodeStructure(descriptor) {
            when (value) {
                is PinAuthenticatorProtectionStatus.LockedOut -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinAuthenticatorProtectionStatus.LockedOut::class.java.simpleName,
                        LockedOutImpl.serializer()
                    )
                }
                is PinAuthenticatorProtectionStatus.LastAttemptFailed -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinAuthenticatorProtectionStatus.LastAttemptFailed::class.java.simpleName,
                        LastAttemptFailedImpl.serializer()
                    )
                }
                is PinAuthenticatorProtectionStatus.Unlocked -> {
                    encodeSubType(
                        descriptor,
                        value.toDto(),
                        PinAuthenticatorProtectionStatus.Unlocked::class.java.simpleName,
                        UnlockedImpl.serializer()
                    )
                }
                else -> throw SerializationException("The given PIN authenticator protection status is not supported.")
            }
        }
    }
}
