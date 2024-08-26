/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.RecoverableErrorSerializer
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentContext
import ch.nevis.mobile.sdk.api.operation.pin.PinEnrollmentError
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class PinEnrollmentContextImpl(
    val operationId: String,
    val username: String,
    @Suppress("SERIALIZER_TYPE_INCOMPATIBLE")
    @Serializable(with = RecoverableErrorSerializer::class)
    val lastRecoverableError: PinEnrollmentError? = null
) : PinEnrollmentContext {
    override fun username(): String = username

    override fun lastRecoverableError(): Optional<PinEnrollmentError> =
        Optional.ofNullable(lastRecoverableError)
}

fun PinEnrollmentContext.toDto(operationId: String): PinEnrollmentContextImpl {
    return PinEnrollmentContextImpl(
        operationId,
        username(),
        lastRecoverableError().orElse(null)
    )
}
