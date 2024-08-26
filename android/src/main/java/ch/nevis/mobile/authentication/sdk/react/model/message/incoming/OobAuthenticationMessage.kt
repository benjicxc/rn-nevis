/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.Serializable

@Serializable
data class OobAuthenticationMessage(
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
    override val requestHeaders: RequestHeaders? = null
) : UserInteractionOperationMessage()
