/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.DeviceInformation
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class DeviceInformationImpl(
    val name: String,
    val deviceId: String,
    val fcmRegistrationToken: String? = null,
    val idUsernamePairs: Set<IdUsernamePairImpl>
) : DeviceInformation {
    override fun name(): String = name

    override fun deviceId(): String = deviceId

    override fun fcmRegistrationToken(): Optional<String> =
        Optional.ofNullable(fcmRegistrationToken)

    override fun idUsernamePairs(): Set<DeviceInformation.IdUsernamePair> = idUsernamePairs
}

fun DeviceInformation.toDto(): DeviceInformationImpl {
    return DeviceInformationImpl(
        name(),
        deviceId(),
        fcmRegistrationToken().orElse(null),
        idUsernamePairs().toDto()
    )
}
