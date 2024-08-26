/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.cache

import ch.nevis.mobile.authentication.sdk.react.cache.operation.Operation

object OperationCache {
    val operationCache = mutableMapOf<String, Operation<*>>()

    inline fun <reified T : Operation<*>> getOperation(operationId: String): T {
        val operation = operationCache[operationId]
        return if (operation is T) {
            operation
        } else throw IllegalStateException("Operation is missing!")
    }

    fun createOperation(
        operationId: String,
        operation: Operation<*>
    ): Operation<*> {
        operationCache[operationId] = operation
        return operation
    }

    fun updateOperation(
        operationId: String,
        operation: Operation<*>
    ) {
        operationCache[operationId] = operation
    }

    fun cancel(operationId: String) {
        operationCache[operationId]?.cancel()
        removeOperation(operationId)
    }

    // We should clear the state when cancel / error happens
    fun removeOperation(operationId: String) {
        operationCache.remove(operationId)
    }
}
