/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.AccountImpl
import kotlinx.serialization.Serializable

@Serializable
data class LocalAccountsOutMessage(
    override val operationId: String,
    val accounts: List<AccountImpl>
) : ChannelOutMessage()
