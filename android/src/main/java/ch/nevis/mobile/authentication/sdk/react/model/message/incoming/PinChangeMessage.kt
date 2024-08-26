/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.PinPolicySerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy
import kotlinx.serialization.Serializable

@Serializable
data class PinChangeMessage(
    override val operationId: String,
    override val onSuccessProvided: Boolean,
    override val onErrorProvided: Boolean,
    @Serializable(with = RequestHeadersSerializer::class)
    override val requestHeaders: RequestHeaders? = null,
    val username: String? = null,
    @Serializable(with = PinPolicySerializer::class)
    val pinPolicy: PinPolicy? = null,
    val pinChangerProvided: Boolean
) : OperationMessage()
