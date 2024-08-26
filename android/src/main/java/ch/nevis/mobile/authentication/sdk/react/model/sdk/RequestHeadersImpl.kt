/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.RequestHeaders
import kotlinx.serialization.Serializable

@Serializable
data class RequestHeadersImpl(
    val namesAndValues: List<String>
) : RequestHeaders {
    override fun namesAndValues(): List<String> = namesAndValues
}

fun RequestHeaders.toDto(): RequestHeadersImpl {
    return RequestHeadersImpl(
        namesAndValues()
    )
}
