/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.PinAuthenticatorProtectionStatusSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RecoverableErrorSerializer
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.operation.pin.PinAuthenticatorProtectionStatus
import ch.nevis.mobile.sdk.api.operation.userverification.*
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class BiometricUserVerificationContextImpl(
    val operationId: String,
    val authenticator: AuthenticatorImpl
) : BiometricUserVerificationContext {
    override fun authenticator(): Authenticator = authenticator
}

fun BiometricUserVerificationContext.toDto(operationId: String): BiometricUserVerificationContextImpl {
    return BiometricUserVerificationContextImpl(
        operationId,
        authenticator().toDto(operationId)
    )
}

@Serializable
data class DevicePasscodeUserVerificationContextImpl(
    val operationId: String,
    val authenticator: AuthenticatorImpl
) : DevicePasscodeUserVerificationContext {
    override fun authenticator(): Authenticator = authenticator
}

fun DevicePasscodeUserVerificationContext.toDto(operationId: String): DevicePasscodeUserVerificationContextImpl {
    return DevicePasscodeUserVerificationContextImpl(
        operationId,
        authenticator().toDto(operationId)
    )
}

@Serializable
data class FingerprintUserVerificationContextImpl(
    val operationId: String,
    val authenticator: AuthenticatorImpl,
    @Suppress("SERIALIZER_TYPE_INCOMPATIBLE")
    @Serializable(with = RecoverableErrorSerializer::class)
    val lastRecoverableError: FingerprintUserVerificationError? = null
) : FingerprintUserVerificationContext {
    override fun authenticator(): Authenticator = authenticator

    override fun lastRecoverableError(): Optional<FingerprintUserVerificationError> =
        Optional.ofNullable(lastRecoverableError)
}

fun FingerprintUserVerificationContext.toDto(operationId: String): FingerprintUserVerificationContextImpl {
    return FingerprintUserVerificationContextImpl(
        operationId,
        authenticator().toDto(operationId),
        lastRecoverableError().orElse(null)
    )
}

@Serializable
data class PinUserVerificationContextImpl(
    val operationId: String,
    val authenticator: AuthenticatorImpl,
    @Serializable(with = PinAuthenticatorProtectionStatusSerializer::class)
    val authenticatorProtectionStatus: PinAuthenticatorProtectionStatus,
    @Suppress("SERIALIZER_TYPE_INCOMPATIBLE")
    @Serializable(with = RecoverableErrorSerializer::class)
    val lastRecoverableError: PinUserVerificationError? = null
) : PinUserVerificationContext {
    override fun authenticator(): Authenticator = authenticator

    override fun authenticatorProtectionStatus(): PinAuthenticatorProtectionStatus =
        authenticatorProtectionStatus

    override fun lastRecoverableError(): Optional<PinUserVerificationError> =
        Optional.ofNullable(lastRecoverableError)
}

fun PinUserVerificationContext.toDto(operationId: String): PinUserVerificationContextImpl {
    return PinUserVerificationContextImpl(
        operationId,
        authenticator().toDto(operationId),
        authenticatorProtectionStatus(),
        lastRecoverableError().orElse(null)
    )
}
