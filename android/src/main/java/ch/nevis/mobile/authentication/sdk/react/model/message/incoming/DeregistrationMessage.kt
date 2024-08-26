/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.AuthorizationProviderSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.sdk.api.authorization.AuthorizationProvider
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.Serializable

@Serializable
data class DeregistrationMessage(
    override val operationId: String,
    override val onSuccessProvided: Boolean,
    override val onErrorProvided: Boolean,
    @Serializable(with = RequestHeadersSerializer::class)
    override val requestHeaders: RequestHeaders? = null,
    val username: String? = null,
    val aaid: String? = null,
    @Serializable(with = AuthorizationProviderSerializer::class)
    var authorizationProvider: AuthorizationProvider? = null
) : OperationMessage()
