/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.sdk.OutOfBandPayloadImpl
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.Serializable

@Serializable
data class OobOperationMessage(
    override val operationId: String,
    override val onSuccessProvided: Boolean,
    override val onErrorProvided: Boolean,
    @Serializable(with = RequestHeadersSerializer::class)
    override val requestHeaders: RequestHeaders? = null,
    val subOperationId: String,
    val payload: OutOfBandPayloadImpl? = null,
    val onRegistrationProvided: Boolean,
    val onAuthenticationProvided: Boolean
) : OperationMessage()
