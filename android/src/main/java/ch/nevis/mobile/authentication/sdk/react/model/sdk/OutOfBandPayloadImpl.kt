/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.serializer.ContentTypeSerializer
import ch.nevis.mobile.sdk.api.operation.outofband.ContentType
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandPayload
import ch.nevis.mobile.sdk.api.operation.outofband.RedeemData
import ch.nevis.mobile.sdk.api.util.Optional
import kotlinx.serialization.Serializable

@Serializable
data class OutOfBandPayloadImpl(
    @Serializable(with = ContentTypeSerializer::class)
    val contentType: ContentType,
    val version: String,
    val data: String? = null,
    val redeemData: RedeemDataImpl
) : OutOfBandPayload {
    override fun contentType(): ContentType = contentType

    override fun version(): String = version

    override fun data(): Optional<String> = Optional.ofNullable(data)

    override fun redeemData(): RedeemData = redeemData
}

fun OutOfBandPayload.toDto(): OutOfBandPayloadImpl {
    return OutOfBandPayloadImpl(
        contentType(),
        version(),
        data().orElse(null),
        redeemData().toDto()
    )
}
