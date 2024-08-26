/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.sdk.PromptOptions
import ch.nevis.mobile.authentication.sdk.react.model.serializer.PromptOptionsSerializer
import kotlinx.serialization.Serializable

@Serializable
data class ListenForOsCredentialsMessage(
    override val operationId: String,
    @Serializable(with = PromptOptionsSerializer::class)
    val promptOptions: PromptOptions? = null
) : ChannelInMessage()
