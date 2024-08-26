/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.error

import ch.nevis.mobile.authentication.sdk.react.model.serializer.SessionProviderSerializer
import ch.nevis.mobile.sdk.api.authorization.SessionProvider
import kotlinx.serialization.Serializable

@Serializable
data class ChannelErrorData(
    val description: String?,
    val errorCode: ChannelErrorCode? = null,
    @Serializable(with = SessionProviderSerializer::class)
    val sessionProvider: SessionProvider? = null,
    val cause: String? = null
)
