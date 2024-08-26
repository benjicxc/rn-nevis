/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache.operation

import ch.nevis.mobile.authentication.sdk.react.cache.state.NoOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.OperationState
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onerror.DefaultOnErrorImpl
import ch.nevis.mobile.authentication.sdk.react.userinteraction.onsuccess.DefaultOnSuccessImpl
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError

data class InitializationOperation(
    override var state: OperationState,
    override val onSuccess: (provider: Unit?) -> Unit,
    override val onError: (MobileAuthenticationClientError) -> Unit
) : Operation<Unit>() {
    constructor(operationId: String) : this(
        state = NoOperation,
        onSuccess = { DefaultOnSuccessImpl(operationId, ReactMethodName.INIT_CLIENT).onSuccess() },
        onError = { DefaultOnErrorImpl(operationId, ReactMethodName.INIT_CLIENT).onError(it) }
    )

    override fun cancel() {
        state.cancel()
    }
}
