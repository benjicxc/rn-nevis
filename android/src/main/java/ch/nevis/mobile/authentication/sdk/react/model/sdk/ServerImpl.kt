/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.localdata.Server
import kotlinx.serialization.Serializable
import java.net.URI

@Serializable
data class ServerImpl(
    val baseUrl: String
) : Server {
    override fun baseUrl(): URI {
        return URI.create(baseUrl)
    }
}

fun Server.toDto(): ServerImpl {
    return ServerImpl(
        baseUrl = baseUrl().toString()
    )
}
