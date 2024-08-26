/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.changer

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.PinChangeOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.PinChange
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.PinChangerMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeContext
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeHandler
import ch.nevis.mobile.sdk.api.operation.pin.PinChanger
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy

class PinChangerImpl(
    private val operationId: String,
    private val pinPolicy: PinPolicy?
) : PinChanger {

    override fun changePin(context: PinChangeContext?, handler: PinChangeHandler?) {
        val operation = OperationCache.getOperation<PinChangeOperation>(operationId)
        OperationCache.updateOperation(operationId, operation.update(PinChange(context, handler)))
        context?.also {
            val pinChangerMessage = PinChangerMessage(
                operationId,
                it.toDto(operationId)
            )

            EventEmitter.dispatch(ReactMethodName.PIN_CHANGE, pinChangerMessage)
        } ?: throw IllegalStateException("PinChangeContext cannot be null.")
    }

    override fun pinPolicy(): PinPolicy {
        return pinPolicy ?: super.pinPolicy()
    }
}
