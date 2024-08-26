/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import kotlinx.serialization.Serializable

@Serializable
sealed class ChannelOutMessage {
    abstract val operationId: String
}
