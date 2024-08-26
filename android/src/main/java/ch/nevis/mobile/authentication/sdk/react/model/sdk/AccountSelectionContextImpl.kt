/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.Authenticator
import ch.nevis.mobile.sdk.api.operation.selection.AccountSelectionContext
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class AccountSelectionContextImpl(
    val operationId: String,
    val accounts: Set<AccountImpl>,
    val authenticators: Set<AuthenticatorImpl>,
    val transactionConfirmationData: String? = null,
) : AccountSelectionContext {
    override fun accounts(): Set<Account> = accounts

    override fun authenticators(): Set<Authenticator> = authenticators

    override fun isPolicyCompliant(username: String, aaid: String) = throw NotImplementedError()

    override fun transactionConfirmationData(): Optional<ByteArray> =
        Optional.ofNullable(transactionConfirmationData?.toByteArray())
}

fun AccountSelectionContext.toDto(operationId: String): AccountSelectionContextImpl {
    val transactionConfirmationData = if (transactionConfirmationData().isPresent) {
        String(transactionConfirmationData().get())
    } else {
        null
    }
    return AccountSelectionContextImpl(
        operationId,
        accounts().toDto(),
        authenticators().toDto(operationId),
        transactionConfirmationData
    )
}
