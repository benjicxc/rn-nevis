/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.RegistrationInfo
import kotlinx.serialization.Serializable

@Serializable
data class RegistrationInfoImpl(
    val registeredAccounts: Set<AccountImpl>,
) : RegistrationInfo {
    override fun registeredAccounts(): Set<Account> = registeredAccounts

    override fun isRegistered(username: String?): Boolean {
        username?.let { checkedUsername: String ->
            return registeredAccounts.any { checkedUsername == it.username() }
        }
        return false
    }
}

fun RegistrationInfo.toDto(): RegistrationInfoImpl {
    return RegistrationInfoImpl(
        registeredAccounts().toDto()
    )
}
