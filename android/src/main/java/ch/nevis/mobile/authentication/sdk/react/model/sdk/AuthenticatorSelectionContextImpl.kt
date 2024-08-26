/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.operation.selection.AuthenticatorSelectionContext
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class AuthenticatorSelectionContextImpl(
    val operationId: String,
    val account: AccountImpl,
    val authenticators: Set<AuthenticatorImpl>,
    val transactionConfirmationData: String?,
) : AuthenticatorSelectionContext {
    override fun account(): Account = account

    override fun authenticators(): Set<Authenticator> = authenticators

    override fun isPolicyCompliant(aaid: String): Boolean = throw NotImplementedError()

    override fun transactionConfirmationData(): Optional<ByteArray> =
        Optional.ofNullable(transactionConfirmationData?.toByteArray())
}

fun AuthenticatorSelectionContext.toDto(operationId: String): AuthenticatorSelectionContextImpl {
    val transactionConfirmationData = if (transactionConfirmationData().isPresent) {
        String(transactionConfirmationData().get())
    } else {
        null
    }
    return AuthenticatorSelectionContextImpl(
        operationId,
        account().toDto(),
        authenticators().toDto(operationId),
        transactionConfirmationData
    )
}