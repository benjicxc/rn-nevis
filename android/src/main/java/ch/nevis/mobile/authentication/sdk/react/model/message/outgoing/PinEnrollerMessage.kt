/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.PinEnrollmentContextImpl
import kotlinx.serialization.Serializable

@Serializable
data class PinEnrollerMessage(
    override val operationId: String,
    val context: PinEnrollmentContextImpl
) : ChannelOutMessage()
