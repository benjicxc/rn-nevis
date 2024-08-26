/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.PinAuthenticatorProtectionStatusSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RecoverableErrorSerializer
import ch.nevis.mobile.sdk.api.operation.pin.PinAuthenticatorProtectionStatus
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeContext
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeRecoverableError
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class PinChangeContextImpl(
    val operationId: String,
    val username: String,
    @Suppress("SERIALIZER_TYPE_INCOMPATIBLE")
    @Serializable(with = RecoverableErrorSerializer::class)
    val lastRecoverableError: PinChangeRecoverableError? = null,
    @Serializable(with = PinAuthenticatorProtectionStatusSerializer::class)
    val authenticatorProtectionStatus: PinAuthenticatorProtectionStatus
) : PinChangeContext {
    override fun username(): String = username

    override fun lastRecoverableError(): Optional<PinChangeRecoverableError> =
        Optional.ofNullable(lastRecoverableError)

    override fun authenticatorProtectionStatus(): PinAuthenticatorProtectionStatus =
        authenticatorProtectionStatus
}

fun PinChangeContext.toDto(operationId: String): PinChangeContextImpl {
    return PinChangeContextImpl(
        operationId,
        username(),
        lastRecoverableError().orElse(null),
        authenticatorProtectionStatus()
    )
}
