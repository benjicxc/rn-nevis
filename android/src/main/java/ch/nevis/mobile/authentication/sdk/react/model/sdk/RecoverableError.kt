/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.pin.PinChangeRecoverableError
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentError
import ch.nevis.mobile.sdk.api.operation.userverification.FingerprintUserVerificationError
import ch.nevis.mobile.sdk.api.operation.userverification.PinUserVerificationError
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class PinEnrollmentInvalidPinFormatImpl(
    override val description: String
) : PinEnrollmentError.InvalidPinFormat, MobileAuthenticationClientErrorImpl()

fun PinEnrollmentError.InvalidPinFormat.toDto(): PinEnrollmentInvalidPinFormatImpl {
    return PinEnrollmentInvalidPinFormatImpl(this.description())
}

@Serializable
data class PinChangeInvalidPinImpl(
    override val description: String
) : PinChangeRecoverableError.InvalidPin, MobileAuthenticationClientErrorImpl()

fun PinChangeRecoverableError.InvalidPin.toDto(): PinChangeInvalidPinImpl {
    return PinChangeInvalidPinImpl(this.description())
}

@Serializable
data class PinChangeInvalidPinFormatImpl(
    override val description: String
) : PinChangeRecoverableError.InvalidPinFormat, MobileAuthenticationClientErrorImpl()

fun PinChangeRecoverableError.InvalidPinFormat.toDto(): PinChangeInvalidPinFormatImpl {
    return PinChangeInvalidPinFormatImpl(this.description())
}

@Serializable
data class PinChangeOldPinEqualsNewPinImpl(
    override val description: String
) : PinChangeRecoverableError.OldPinEqualsNewPin, MobileAuthenticationClientErrorImpl()

fun PinChangeRecoverableError.OldPinEqualsNewPin.toDto(): PinChangeOldPinEqualsNewPinImpl {
    return PinChangeOldPinEqualsNewPinImpl(this.description())
}

@Serializable
data class FingerprintUserVerificationErrorImpl(
    override val description: String,
    val message: String? = null
) : FingerprintUserVerificationError, MobileAuthenticationClientErrorImpl() {
    override fun message(): Optional<String> {
        return Optional.ofNullable(message)
    }
}

fun FingerprintUserVerificationError.toDto(): FingerprintUserVerificationErrorImpl {
    return FingerprintUserVerificationErrorImpl(
        description(),
        message().orElse(null)
    )
}

@Serializable
data class PinUserVerificationInvalidPinImpl(
    override val description: String,
) : PinUserVerificationError.InvalidPin, MobileAuthenticationClientErrorImpl()

fun PinUserVerificationError.InvalidPin.toDto(): PinUserVerificationInvalidPinImpl {
    return PinUserVerificationInvalidPinImpl(
        description()
    )
}
