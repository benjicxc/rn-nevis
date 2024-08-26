/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.userinteraction.selector

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.cache.operation.DeregistrationOperation
import ch.nevis.mobile.authentication.sdk.react.cache.state.SelectAuthenticator
import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.AuthenticatorSelectionMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelectionContext
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelectionHandler
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelector

class DeregistrationAuthenticatorSelectorImpl(
    private val operationId: String
) : AuthenticatorSelector {

    override fun selectAuthenticator(
        authenticatorSelectionContext: AuthenticatorSelectionContext?,
        authenticatorSelectionHandler: AuthenticatorSelectionHandler?
    ) {
        val operation = OperationCache.getOperation<DeregistrationOperation>(operationId)
        OperationCache.updateOperation(
            operationId,
            operation.update(
                SelectAuthenticator(
                    authenticatorSelectionContext,
                    authenticatorSelectionHandler
                )
            )
        )

        authenticatorSelectionContext?.also {
            val message = AuthenticatorSelectionMessage(operationId, it.toDto(operationId))
            EventEmitter.dispatch(ReactMethodName.SELECT_AUTHENTICATOR, message)
        } ?: throw IllegalStateException("AuthenticatorSelectionContext cannot be null.")
    }
}
