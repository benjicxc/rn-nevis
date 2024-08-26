/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelError
import kotlinx.serialization.Serializable

@Serializable
data class ErrorMessage(
    override val operationId: String,
    val exception: ChannelError? = null
) : ChannelOutMessage()
