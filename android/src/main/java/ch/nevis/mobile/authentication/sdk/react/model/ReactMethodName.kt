/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model

enum class ReactMethodName(val methodName: String) {
    // Incoming calls:
    // The method call started on Javascript side but it is implemented, executed on native side.
    // Basic SDK invocations
    INIT_CLIENT("initClient"),
    OOB_PAYLOAD_DECODE("payloadDecode"),
    OOB_OPERATION("oobOperation"),
    OOB_REGISTER("oobRegister"),
    OOB_AUTHENTICATE("oobAuthenticate"),
    REGISTER("register"),
    AUTH_CLOUD_API_REGISTER("authCloudApiRegister"),
    AUTHENTICATE("authenticate"),
    DEREGISTER("deregister"),
    PIN_CHANGE("pinChange"),
    DEVICE_INFORMATION_CHANGE("deviceInformationChange"),
    LOCAL_ACCOUNTS("localAccounts"),
    LOCAL_AUTHENTICATORS("localAuthenticators"),
    LOCAL_DELETE_AUTHENTICATOR("localDeleteAuthenticator"),
    LOCAL_DEVICE_INFORMATION("localDeviceInformation"),

    // Auxiliary SDK invocations
    CANCEL("cancel"),
    ACCOUNT_USERNAME("accountUsername"),
    AUTHENTICATOR_AAID("authenticatorAaid"),
    PIN_ENROLL("pinEnroll"),
    PINS_CHANGE("pinsChange"),
    PIN_VERIFY("pinVerify"),
    IS_POLICY_COMPLIANT("isPolicyCompliant"),
    LISTEN_FOR_OS_CREDENTIALS("listenForOsCredentials"),
    CANCEL_AUTHENTICATION("cancelAuthentication"),
    PAUSE_LISTENING("pauseListening"),
    RESUME_LISTENING("resumeListening"),

    // Outgoing calls:
    // The method call is started on native side but it is implemented, executed on Javascript side.
    ON_VALID_CREDENTIALS_PROVIDED("onValidCredentialsProvided"),
    OPERATION_TYPE("operationType"),
    SELECT_ACCOUNT("selectAccount"),
    SELECT_AUTHENTICATOR("selectAuthenticator"),
    VERIFY_USER("verifyUser")
}
