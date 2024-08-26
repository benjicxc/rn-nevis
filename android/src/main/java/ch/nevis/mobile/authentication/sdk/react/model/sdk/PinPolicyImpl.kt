/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy
import kotlinx.serialization.Serializable

@Serializable
data class PinPolicyImpl(
    val minLength: Int,
    val maxLength: Int
) : PinPolicy {
    override fun minLength(): Int = minLength

    override fun maxLength(): Int = maxLength
}

fun PinPolicy.toDto(): PinPolicyImpl {
    return PinPolicyImpl(
        minLength(),
        maxLength()
    )
}
