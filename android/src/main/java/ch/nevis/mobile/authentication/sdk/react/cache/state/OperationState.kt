/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.state

interface OperationState {
    fun cancel() {
        // empty default implementation
    }
}

object NoOperation: OperationState
