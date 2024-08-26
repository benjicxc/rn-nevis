/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.operation

import ch.nevis.mobile.authentication.sdk.react.cache.state.NoOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.OperationState
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onerror.DefaultOnErrorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onsuccess.DefaultOnSuccessImpl
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError

sealed class Operation<T> {
    abstract var state: OperationState
    abstract val onSuccess: (T?) -> Unit
    abstract val onError: (MobileAuthenticationClientError) -> Unit
    abstract fun cancel()
}

data class DeviceInformationChangeOperation(
    override var state: OperationState,
    override var onSuccess: (Unit?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit
) : Operation<Unit>() {
    constructor(operationId: String) : this(
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.DEVICE_INFORMATION_CHANGE).onSuccess()
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.DEVICE_INFORMATION_CHANGE).onError(it)
        },
        state = NoOperation
    )

    override fun cancel() {
        state.cancel()
    }
}
