/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import ch.nevis.mobile.authentication.sdk.react.cache.OperationCache
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.ChannelOutMessage
import ch.nevis.mobile.authentication.sdk.react.util.Json
import com.facebook.react.bridge.Promise
import kotlinx.serialization.encodeToString

private const val ERROR_CODE = "NMA_SDK"

object MethodChannelHandler {
    var channelData = HashMap<ReactMethodName, Promise>()

    fun resolve(method: ReactMethodName, message: ChannelOutMessage?) {
        channelData.remove(method)?.let { promise: Promise ->
            message?.let {
                val json = Json.instance.encodeToString(it)
                val map = Json.toMap(json)
                promise.resolve(map)
            } ?: promise.resolve(null)
        }
    }

    fun reject(method: ReactMethodName, message: ChannelOutMessage) {
        channelData.remove(method)?.let {
            val json = Json.instance.encodeToString(message)
            val map = Json.toMap(json)
            it.reject(ERROR_CODE, message.operationId, map)
        }

        OperationCache.removeOperation(message.operationId)
    }
}
