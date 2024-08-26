/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import kotlinx.serialization.Serializable

@Serializable
data class IsPolicyCompliantMessage(
    override val operationId: String,
    val aaid: String,
    val username: String? = null
) : ChannelInMessage()
