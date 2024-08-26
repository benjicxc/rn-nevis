/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.message.incoming

import ch.nevis.mobile.authentication.sdk.react.model.serializer.DeviceInformationSerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.PinPolicySerializer
import ch.nevis.mobile.authentication.sdk.react.model.serializer.RequestHeadersSerializer
import ch.nevis.mobile.sdk.api.localdata.DeviceInformation
import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import ch.nevis.mobile.sdk.api.operation.pin.PinPolicy
import kotlinx.serialization.Serializable

@Serializable
data class OobRegistrationMessage(
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
    @Serializable(with = DeviceInformationSerializer::class)
    val deviceInformation: DeviceInformation? = null,
    @Serializable(with = PinPolicySerializer::class)
    val pinPolicy: PinPolicy? = null,
    val allowClass2Sensors: Boolean? = null,
    val allowDevicePasscodeAsFallback: Boolean? = null,
    val invalidateOnNewOsBiometrics: Boolean? = null
) : UserInteractionOperationMessage()
