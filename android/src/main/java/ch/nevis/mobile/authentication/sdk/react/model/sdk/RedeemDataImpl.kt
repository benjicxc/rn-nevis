/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.sdk.api.operation.outofband.RedeemData
import kotlinx.serialization.Serializable
import java.net.URI

@Serializable
data class RedeemDataImpl(
    val token: String,
    val redeemUrl: String
) : RedeemData {
    override fun token(): String = token

    override fun redeemUrl(): URI = URI.create(redeemUrl)
}

fun RedeemData.toDto(): RedeemDataImpl {
    return RedeemDataImpl(
        token(),
        redeemUrl().toString()
    )
}
