/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.util

import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.LocalAuthenticatorsOutMessage
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.*
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import kotlinx.serialization.modules.polymorphic
import kotlinx.serialization.modules.subclass
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

val module = SerializersModule {
    polymorphic(ChannelOutMessage::class) {
        subclass(AccountSelectionMessage::class)
        subclass(AuthenticatorSelectionMessage::class)
        subclass(ErrorMessage::class)
        subclass(LocalAccountsOutMessage::class)
        subclass(LocalAuthenticatorsOutMessage::class)
        subclass(LocalDeviceInformationOutMessage::class)
        subclass(IsPolicyCompliantOutMessage::class)
        subclass(PinEnrollerMessage::class)
        subclass(OnSuccessMessage::class)
        subclass(OnValidCredentialsProvidedMessage::class)
        subclass(OperationTypeMessage::class)
        subclass(UserVerificationMessage::class)
    }
}

object Json {
    val instance = Json {
        ignoreUnknownKeys = true
        serializersModule = module
    }

    fun toMap(json: String): WritableMap {
        return convertJsonToMap(JSONObject(json))
    }

    @Throws(JSONException::class)
    private fun convertJsonToMap(jsonObject: JSONObject): WritableMap {
        val map: WritableMap = WritableNativeMap()
        val iterator: Iterator<String> = jsonObject.keys()
        while (iterator.hasNext()) {
            val key = iterator.next()
            when (val value: Any = jsonObject.get(key)) {
                is JSONObject -> {
                    map.putMap(key, convertJsonToMap(value))
                }
                is JSONArray -> {
                    map.putArray(key, convertJsonToArray(value))
                }
                is Boolean -> {
                    map.putBoolean(key, value)
                }
                is Int -> {
                    map.putInt(key, value)
                }
                is Double -> {
                    map.putDouble(key, value)
                }
                is String -> {
                    map.putString(key, value)
                }
                else -> {
                    map.putString(key, value.toString())
                }
            }
        }
        return map
    }

    @Throws(JSONException::class)
    private fun convertJsonToArray(jsonArray: JSONArray): WritableArray {
        val array: WritableArray = WritableNativeArray()
        for (i in 0 until jsonArray.length()) {
            when (val value = jsonArray[i]) {
                is JSONObject -> {
                    array.pushMap(convertJsonToMap(value))
                }
                is JSONArray -> {
                    array.pushArray(convertJsonToArray(value))
                }
                is Boolean -> {
                    array.pushBoolean(value)
                }
                is Int -> {
                    array.pushInt(value)
                }
                is Double -> {
                    array.pushDouble(value)
                }
                is String -> {
                    array.pushString(value)
                }
                else -> {
                    array.pushString(value.toString())
                }
            }
        }
        return array
    }
}
