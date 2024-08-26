/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import ch.nevis.mobile.authentication.sdk.react.methods.InitClientMethodHandler
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName.*
import ch.nevis.mobile.authentication.sdk.react.model.message.incoming.InitClientMessage
import ch.nevis.mobile.authentication.sdk.react.util.Json
import ch.nevis.mobile.sdk.api.MobileAuthenticationClient
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import org.json.JSONObject

object NevisMobileAuthenticationSdk {
    //region Properties

    private var client: MobileAuthenticationClient? = null
    //endregion

    //region Public Interface

    fun handle(method: ReactMethodName, message: ReadableMap, promise: Promise) {
        MethodChannelHandler.channelData[method] = promise

        val stringToDecode = JSONObject(message.toHashMap()).toString()
        val methodInfo = MethodHandlerConfiguration.methodInfoMap[method.methodName]
        if (methodInfo != null) {
            val (methodHandler, serializer) = methodInfo
            val decodedMessage = Json.instance.decodeFromString(serializer, stringToDecode)
            val currentSdk = client ?: throw IllegalStateException("SDK was not initialized!")
            methodHandler.execute(currentSdk, decodedMessage)
            return
        }

        when (method.methodName) {
            INIT_CLIENT.methodName -> {
                val decodedMessage = Json.instance.decodeFromString(
                    InitClientMessage.serializer(),
                    stringToDecode
                )
                InitClientMethodHandler().execute(decodedMessage) {
                    client = it
                }
            }
            else -> promise.reject(NullPointerException())
        }
    }
    //endregion
}
