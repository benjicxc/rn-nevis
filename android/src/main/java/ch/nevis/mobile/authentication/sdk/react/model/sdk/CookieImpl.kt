/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.authorization.Cookie
import kotlinx.serialization.Serializable
import java.net.URI

@Serializable
data class CookieImpl(
    val uri: String,
    val properties: String
) : Cookie {
    override fun url(): URI {
        return URI.create(uri)
    }
}

fun Cookie.toDto(): CookieImpl {
    return CookieImpl(
        uri = url().toString(),
        properties = toString()
    )
}
