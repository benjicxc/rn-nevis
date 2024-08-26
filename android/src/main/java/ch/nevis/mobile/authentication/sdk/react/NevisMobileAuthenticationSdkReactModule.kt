/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react

import ch.nevis.mobile.authentication.sdk.react.emitter.EventEmitter
import ch.nevis.mobile.authentication.sdk.react.model.ReactMethodName
import ch.nevis.mobile.authentication.sdk.react.util.ApplicationProvider
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class NevisMobileAuthenticationSdkReactModule internal constructor(context: ReactApplicationContext) :
    NevisMobileAuthenticationSdkReactSpec(context) {

    //region Initialization

    init {
        ApplicationProvider.application = currentActivity?.application
        EventEmitter.register(reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java))
    }
    //endregion

    //region NativeModule

    override fun getName(): String {
        return NAME
    }
    //endregion

    //region NevisMobileAuthenticationSdkReactSpec Overrides
    //region Basic SDK invocations

    @ReactMethod
    override fun initClient(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.INIT_CLIENT, message, promise)
    }

    @ReactMethod
    override fun payloadDecode(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.OOB_PAYLOAD_DECODE, message, promise)
    }

    @ReactMethod
    override fun oobOperation(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.OOB_OPERATION, message, promise)
    }

    @ReactMethod
    override fun oobRegister(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.OOB_REGISTER, message, promise)
    }

    @ReactMethod
    override fun oobAuthenticate(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.OOB_AUTHENTICATE, message, promise)
    }

    @ReactMethod
    override fun inBandRegister(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.REGISTER, message, promise)
    }

    @ReactMethod
    override fun authCloudApiRegister(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.AUTH_CLOUD_API_REGISTER, message, promise)
    }

    @ReactMethod
    override fun authenticate(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.AUTHENTICATE, message, promise)
    }

    @ReactMethod
    override fun deregister(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.DEREGISTER, message, promise)
    }

    @ReactMethod
    override fun pinChange(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.PIN_CHANGE, message, promise)
    }

    @ReactMethod
    override fun deviceInformationChange(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.DEVICE_INFORMATION_CHANGE, message, promise)
    }

    @ReactMethod
    override fun localAccounts(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.LOCAL_ACCOUNTS, message, promise)
    }

    @ReactMethod
    override fun localAuthenticators(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.LOCAL_AUTHENTICATORS, message, promise)
    }

    @ReactMethod
    override fun localDeleteAuthenticator(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.LOCAL_DELETE_AUTHENTICATOR, message, promise)
    }

    @ReactMethod
    override fun localDeviceInformation(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.LOCAL_DEVICE_INFORMATION, message, promise)
    }

    //endregion

    //region Auxiliary SDK invocations

    @ReactMethod
    override fun accountUsername(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.ACCOUNT_USERNAME, message, promise)
    }

    @ReactMethod
    override fun authenticatorAaid(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.AUTHENTICATOR_AAID, message, promise)
    }

    @ReactMethod
    override fun pinEnroll(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.PIN_ENROLL, message, promise)
    }

    @ReactMethod
    override fun pinsChange(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.PINS_CHANGE, message, promise)
    }

    @ReactMethod
    override fun pinVerify(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.PIN_VERIFY, message, promise)
    }

    @ReactMethod
    override fun cancel(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.CANCEL, message, promise)
    }

    @ReactMethod
    override fun isPolicyCompliant(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.IS_POLICY_COMPLIANT, message, promise)
    }

    @ReactMethod
    override fun listenForOsCredentials(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.LISTEN_FOR_OS_CREDENTIALS, message, promise)
    }

    @ReactMethod
    override fun cancelAuthentication(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.CANCEL_AUTHENTICATION, message, promise)
    }

    @ReactMethod
    override fun pauseListening(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.PAUSE_LISTENING, message, promise)
    }

    @ReactMethod
    override fun resumeListening(message: ReadableMap, promise: Promise) {
        NevisMobileAuthenticationSdk.handle(ReactMethodName.RESUME_LISTENING, message, promise)
    }

    //endregion
    //endregion

    //region Constants

    companion object {
        const val NAME = "NevisMobileAuthenticationSdkReact"
    }
    //endregion
}
