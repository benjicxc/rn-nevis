/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import kotlinx.serialization.Serializable

@Serializable
data class LocalAuthenticatorsMessage(
    override val operationId: String
) : ChannelInMessage()
