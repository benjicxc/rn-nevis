/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import kotlinx.serialization.Serializable

@Serializable
data class PinsChangeMessage(
    override val operationId: String,
    val oldPin: String? = null,
    val newPin: String? = null
) : ChannelInMessage()
