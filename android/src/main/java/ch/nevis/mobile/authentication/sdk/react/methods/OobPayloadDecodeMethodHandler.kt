/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.methods

import ch.nevis.mobile.authentication.sdk.react.cache.operation.OutOfBandPayloadDecodeOperation
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.ChannelInMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.OobPayloadDecodeMessage
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient

class OobPayloadDecodeMethodHandler : MethodHandler() {
    override fun execute(client: MobileAuthenticationClient, channelInMessage: ChannelInMessage) {
        val message = validate<OobPayloadDecodeMessage>(channelInMessage)
        val operation = OutOfBandPayloadDecodeOperation(message.operationId)

        val outOfBandPayloadDecode = client.operations().outOfBandPayloadDecode()
        message.json?.let {
            outOfBandPayloadDecode.json(it)
        }

        message.base64UrlEncoded?.let {
            outOfBandPayloadDecode.base64UrlEncoded(it)
        }

        if (message.onSuccessProvided) {
            outOfBandPayloadDecode.onSuccess(operation.onSuccess)
        }

        if (message.onErrorProvided) {
            outOfBandPayloadDecode.onError(operation.onError)
        }

        outOfBandPayloadDecode.execute()
    }
}
