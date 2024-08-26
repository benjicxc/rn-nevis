/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.AuthenticatorImpl
import kotlinx.serialization.Serializable

@Serializable
data class LocalAuthenticatorsOutMessage(
    override val operationId: String,
    val authenticators: List<AuthenticatorImpl>
) : ChannelOutMessage()
