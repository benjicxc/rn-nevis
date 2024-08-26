/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.error

import kotlinx.serialization.Serializable

@Serializable
data class ChannelErrorCode(
    val type: String,
    val description: String
)
