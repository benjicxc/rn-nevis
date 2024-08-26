/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
sealed class MobileAuthenticationClientErrorImpl : MobileAuthenticationClientError {
    abstract val description: String

    override fun description(): String = description

    override fun cause(): Optional<Exception> = Optional.empty()
}
