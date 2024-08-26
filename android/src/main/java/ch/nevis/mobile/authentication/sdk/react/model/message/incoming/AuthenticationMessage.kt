/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RetryPolicySerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.SessionProviderSerializer
import ch.nevis.mobile.sdk.api.authorization.SessionProvider
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import ch.nevis.mobile.sdk.api.operation.RetryPolicy
import kotlinx.serialization.Serializable

@Serializable
data class AuthenticationMessage(
    override val operationId: String,
    override val accountSelectorProvided: Boolean,
    override val authenticatorSelectorProvided: Boolean,
    override val pinEnrollerProvided: Boolean,
    override val pinUserVerifierProvided: Boolean,
    override val biometricUserVerifierProvided: Boolean,
    override val devicePasscodeUserVerifierProvided: Boolean,
    override val fingerprintUserVerifierProvided: Boolean,
    override val onSuccessProvided: Boolean,
    override val onErrorProvided: Boolean,
    @Serializable(with = RequestHeadersSerializer::class)
    override val requestHeaders: RequestHeaders? = null,
    val username: String? = null,
    @Serializable(with = SessionProviderSerializer::class)
    var sessionProvider: SessionProvider? = null,
    @Serializable(with = RetryPolicySerializer::class)
    val retryPolicy: RetryPolicy? = null
) : UserInteractionOperationMessage()
