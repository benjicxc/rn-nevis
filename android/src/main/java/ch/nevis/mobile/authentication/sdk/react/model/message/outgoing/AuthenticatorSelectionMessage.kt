/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.AuthenticatorSelectionContextImpl
import kotlinx.serialization.Serializable

@Serializable
data class AuthenticatorSelectionMessage(
    override val operationId: String,
    val context: AuthenticatorSelectionContextImpl,
) : ChannelOutMessage()