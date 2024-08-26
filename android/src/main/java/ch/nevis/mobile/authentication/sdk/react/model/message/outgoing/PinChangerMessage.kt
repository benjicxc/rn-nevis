/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.PinChangeContextImpl
import kotlinx.serialization.Serializable

@Serializable
data class PinChangerMessage(
    override val operationId: String,
    val context: PinChangeContextImpl
) : ChannelOutMessage()
