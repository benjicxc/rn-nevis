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
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandPayload

data class OutOfBandPayloadDecodeOperation(
    override var state: OperationState,
    override var onSuccess: (OutOfBandPayload?) -> Unit,
    override var onError: (MobileAuthenticationClientError) -> Unit,
) : Operation<OutOfBandPayload>() {
    constructor(operationId: String) : this(
        onSuccess = {
            DefaultOnSuccessImpl(operationId, ReactMethodName.OOB_PAYLOAD_DECODE).onSuccess(outOfBandPayload = it)
        },
        onError = {
            DefaultOnErrorImpl(operationId, ReactMethodName.OOB_PAYLOAD_DECODE).onError(it)
        },
        state = NoOperation
    )

    override fun cancel() {
        state.cancel()
    }
}
