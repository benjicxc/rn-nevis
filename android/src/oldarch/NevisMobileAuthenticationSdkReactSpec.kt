/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import com.facebook.react.bridge.*
abstract class NevisMobileAuthenticationSdkReactSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

    //
    // Basic SDK invocations
    //
    abstract fun initClient(message: ReadableMap, promise: Promise)
    abstract fun payloadDecode(message: ReadableMap, promise: Promise)
    abstract fun oobOperation(message: ReadableMap, promise: Promise)
    abstract fun oobRegister(message: ReadableMap, promise: Promise)
    abstract fun oobAuthenticate(message: ReadableMap, promise: Promise)
    abstract fun inBandRegister(message: ReadableMap, promise: Promise)
    abstract fun authCloudApiRegister(message: ReadableMap, promise: Promise)
    abstract fun authenticate(message: ReadableMap, promise: Promise)
    abstract fun deregister(message: ReadableMap, promise: Promise)
    abstract fun pinChange(message: ReadableMap, promise: Promise)
    abstract fun deviceInformationChange(message: ReadableMap, promise: Promise)
    abstract fun localAccounts(message: ReadableMap, promise: Promise)
    abstract fun localAuthenticators(message: ReadableMap, promise: Promise)
    abstract fun localDeleteAuthenticator(message: ReadableMap, promise: Promise)
    abstract fun localDeviceInformation(message: ReadableMap, promise: Promise)

    //
    // Auxiliary SDK invocations
    //
    abstract fun accountUsername(message: ReadableMap, promise: Promise)
    abstract fun authenticatorAaid(message: ReadableMap, promise: Promise)
    abstract fun pinEnroll(message: ReadableMap, promise: Promise)
    abstract fun pinsChange(message: ReadableMap, promise: Promise)
    abstract fun pinVerify(message: ReadableMap, promise: Promise)
    abstract fun cancel(message: ReadableMap, promise: Promise)
    abstract fun isPolicyCompliant(message: ReadableMap, promise: Promise)
    abstract fun listenForOsCredentials(message: ReadableMap, promise: Promise)
    abstract fun cancelAuthentication(message: ReadableMap, promise: Promise)
    abstract fun pauseListening(message: ReadableMap, promise: Promise)
    abstract fun resumeListening(message: ReadableMap, promise: Promise)
}
