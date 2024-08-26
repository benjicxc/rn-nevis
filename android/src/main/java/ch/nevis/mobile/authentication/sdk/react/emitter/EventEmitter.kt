/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.emitter

import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.model.message.outgoing.ChannelOutMessage
import ch.nevis.mobile.authentication.sdk.react.util.Json
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import kotlinx.serialization.encodeToString

object EventEmitter {
    private var emitter: RCTDeviceEventEmitter? = null

    fun register(eventEmitter: RCTDeviceEventEmitter) {
        emitter = eventEmitter
    }

    fun dispatch(method: ReactMethodName, message: ChannelOutMessage) {
      val json = Json.instance.encodeToString(message)
      val map = Json.toMap(json)
      emitter?.emit(method.methodName, map)
    }
}
