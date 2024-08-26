/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.selector

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.UserInteractionOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.SelectAccount
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.AccountSelectionMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelectionContext
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelectionHandler
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelector

class AccountSelectorImpl(
    private val operationId: String
) : AccountSelector {

    override fun selectAccount(
        accountSelectionContext: AccountSelectionContext?,
        accountSelectionHandler: AccountSelectionHandler?
    ) {
        val operation = OperationCache.getOperation<UserInteractionOperation>(operationId)
        OperationCache.updateOperation(
            operationId,
            operation.update(SelectAccount(accountSelectionContext, accountSelectionHandler))
        )

        accountSelectionContext?.also {
            val message = AccountSelectionMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.SELECT_ACCOUNT, message)
        } ?: throw IllegalStateException("AccountSelectionContext cannot be null.")
    }
}
