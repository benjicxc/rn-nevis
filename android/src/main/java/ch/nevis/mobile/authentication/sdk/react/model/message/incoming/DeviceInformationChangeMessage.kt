/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RetryPolicySerializer
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import ch.nevis.mobile.sdk.api.operation.RetryPolicy
import kotlinx.serialization.Serializable

@Serializable
data class DeviceInformationChangeMessage(
    override val operationId: String,
    @Serializable(with = RequestHeadersSerializer::class)
    override val requestHeaders: RequestHeaders? = null,
    override val onSuccessProvided: Boolean,
    override val onErrorProvided: Boolean,
    val name: String? = null,
    val fcmRegistrationToken: String? = null,
    val disablePushNotifications: Boolean? = null,
    @Serializable(with = RetryPolicySerializer::class)
    val retryPolicy: RetryPolicy? = null
) : OperationMessage()
