/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.AccountSelectionContextImpl
import kotlinx.serialization.Serializable

@Serializable
data class AccountSelectionMessage(
    override val operationId: String,
    val context: AccountSelectionContextImpl,
) : ChannelOutMessage()