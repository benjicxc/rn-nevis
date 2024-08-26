/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.pin.PinAuthenticatorProtectionStatus
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class LockedOutImpl : PinAuthenticatorProtectionStatus.LockedOut

fun PinAuthenticatorProtectionStatus.LockedOut.toDto(): LockedOutImpl {
    return LockedOutImpl()
}

@Serializable
data class LastAttemptFailedImpl(
    val remainingRetries: Int,
    @SerialName("coolDownTimeInSec")
    val coolDownTimeInSeconds: Long
) : PinAuthenticatorProtectionStatus.LastAttemptFailed {
    override fun remainingRetries(): Int = remainingRetries

    override fun coolDownTimeInSeconds(): Long = coolDownTimeInSeconds
}

fun PinAuthenticatorProtectionStatus.LastAttemptFailed.toDto(): LastAttemptFailedImpl {
    return LastAttemptFailedImpl(
        remainingRetries(),
        coolDownTimeInSeconds()
    )
}

@Serializable
class UnlockedImpl : PinAuthenticatorProtectionStatus.Unlocked

fun PinAuthenticatorProtectionStatus.Unlocked.toDto(): UnlockedImpl {
    return UnlockedImpl()
}
