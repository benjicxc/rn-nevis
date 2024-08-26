/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.MethodChannelHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.LocalAccountsOutMessage
import ch.nevis.mobile.authentication.sdk.react.model.sdk.AccountImpl
import ch.nevis.mobile.authentication.sdk.react.model.sdk.toDto
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient
import ch.nevis.mobile.sdk.api.localdata.Account
import ch.nevis.mobile.sdk.api.localdata.LocalData

class LocalAccountsMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val resultMessage = LocalAccountsOutMessage(
            channelInMessage.operationId,
            accounts(client.localData())
        )
        MethodChannelHandler.resolve(ReactMethodName.LOCAL_ACCOUNTS, resultMessage)
    }

    private fun accounts(localData: LocalData): List<AccountImpl> {
        val accounts: LinkedHashSet<Account> = LinkedHashSet()
        for (authenticator in localData.authenticators()) {
            accounts.addAll(authenticator.registration().registeredAccounts())
        }
        return accounts.map { it.toDto() }.toList()
    }
}
