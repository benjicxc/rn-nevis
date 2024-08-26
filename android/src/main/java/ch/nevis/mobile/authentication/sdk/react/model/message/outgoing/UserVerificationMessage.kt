/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.serializer.UserVerificationContextSerializer
import ch.nevis.mobile.sdk.api.operation.userverification.UserVerificationContext
import kotlinx.serialization.Serializable

@Serializable
data class UserVerificationMessage(
    override val operationId: String,
    @Serializable(with = UserVerificationContextSerializer::class)
    val context: UserVerificationContext
) : ChannelOutMessage()
