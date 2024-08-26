/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.state

import ch.nevis.mobile.sdk.api.operation.pin.PinChangeContext
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeHandler

sealed class PinChangeOperationState : OperationState

data class PinChange(
    val pinChangeContext: PinChangeContext?,
    val pinChangeHandler: PinChangeHandler?,
) : PinChangeOperationState() {

    override fun cancel() {
        pinChangeHandler?.cancel()
    }
}
