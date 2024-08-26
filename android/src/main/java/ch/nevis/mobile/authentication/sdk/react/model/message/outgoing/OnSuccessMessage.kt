/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.outgoing

import ch.nevis.mobile.authentication.sdk.react.model.sdk.OutOfBandPayloadImpl
import ch.nevis.mobile.authentication.sdk.react.model.serializer.AuthorizationProviderSerializer
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider
import kotlinx.serialization.Serializable

@Serializable
data class OnSuccessMessage(
    override val operationId: String,
    @Serializable(with = AuthorizationProviderSerializer::class)
    var authorizationProvider: AuthorizationProvider? = null,
    var outOfBandPayload: OutOfBandPayloadImpl? = null
) : ChannelOutMessage()
