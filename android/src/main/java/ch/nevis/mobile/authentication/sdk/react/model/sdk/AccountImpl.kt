/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.Server
import kotlinx.serialization.Serializable

@Serializable
data class AccountImpl(
    val username: String,
    val server: ServerImpl,
) : Account {
    override fun username() = username
    override fun server(): Server = server
}

fun Account.toDto(): AccountImpl {
    return AccountImpl(this.username(), this.server().toDto())
}

fun Set<Account>.toDto(): Set<AccountImpl> {
    return this.map { it.toDto() }.toSet()
}
