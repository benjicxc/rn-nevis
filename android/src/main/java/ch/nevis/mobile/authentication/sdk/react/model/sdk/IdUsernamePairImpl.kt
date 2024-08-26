/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.DeviceInformation
import kotlinx.serialization.Serializable

@Serializable
data class IdUsernamePairImpl(
    val username: String,
    val identifier: String
) : DeviceInformation.IdUsernamePair {
    override fun username(): String = username

    override fun id(): String = identifier
}

fun DeviceInformation.IdUsernamePair.toDto(): IdUsernamePairImpl {
    return IdUsernamePairImpl(username(), id())
}

fun Set<DeviceInformation.IdUsernamePair>.toDto(): Set<IdUsernamePairImpl> {
    return map { it.toDto() }.toSet()
}
