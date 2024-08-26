/*
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

package ch.nevis.mobile.authentication.sdk.react.model.sdk

import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelError
import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelErrorCode
import ch.nevis.mobile.authentication.sdk.react.model.error.ChannelErrorData
import ch.nevis.mobile.sdk.api.InitializationError
import ch.nevis.mobile.sdk.api.MobileAuthenticationClientError
import ch.nevis.mobile.sdk.api.authorization.SessionProvider
import ch.nevis.mobile.sdk.api.operation.AuthenticationError
import ch.nevis.mobile.sdk.api.operation.OperationError
import ch.nevis.mobile.sdk.api.operation.authcloudapi.AuthCloudApiError
import ch.nevis.mobile.sdk.api.operation.outofband.DeviceInformationChangeError
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandOperationError
import ch.nevis.mobile.sdk.api.operation.outofband.OutOfBandPayloadError
import ch.nevis.mobile.sdk.api.operation.pin.PinChangeError

private const val UNKNOWN_ERROR = "Unknown"
private const val FIDO_ERROR = "FidoError"
private const val MALFORMED_PAYLOAD_ERROR = "MalformedPayload"

fun MobileAuthenticationClientError.toChannelError(): ChannelError {
    val errorCode: ChannelErrorCode? = when (this) {
        is OperationError -> this.errorCode()
        is AuthCloudApiError.OperationError -> this.errorCode()
        else -> null
    }?.let{
        ChannelErrorCode(
            it.name,
            it.description()
        )
    }

    val sessionProvider: SessionProvider? =
        if (this is AuthenticationError && this.sessionProvider() !is SessionProvider.EmptySessionProvider) {
            // EmptySessionProvider is not supported by the React plugin
            this.sessionProvider()
        } else {
            null
        }

    val cause: String? = if (errorCode == null) {
        this.cause().orElse(null)?.stackTraceWithMessageToString()
    } else {
        null
    }

    return ChannelError(
        this.type(),
        ChannelErrorData(
            this.description(),
            errorCode,
            sessionProvider,
            cause
        )
    )
}

private fun Exception.stackTraceWithMessageToString(): String {
    return "${this::class.java.simpleName}$message${stackTraceToString()}"
}

private fun MobileAuthenticationClientError.type(): String {
    return when (this) {
        is DeviceInformationChangeError -> this.type()
        is InitializationError -> this.type()
        is OperationError -> this.type()
        is OutOfBandOperationError -> this.type()
        is OutOfBandPayloadError -> this.type()
        is PinChangeError -> this.type()
        is AuthCloudApiError -> this.type()
        else -> UNKNOWN_ERROR
    }
}

private fun DeviceInformationChangeError.type(): String {
    return when (this) {
        is DeviceInformationChangeError.NameAlreadyExists -> DeviceInformationChangeError.NameAlreadyExists::class.java.simpleName
        is DeviceInformationChangeError.NoDeviceLockError -> DeviceInformationChangeError.NoDeviceLockError::class.java.simpleName
        is DeviceInformationChangeError.DeviceProtectionError -> DeviceInformationChangeError.DeviceProtectionError::class.java.simpleName
        is DeviceInformationChangeError.NetworkError -> DeviceInformationChangeError.NetworkError::class.java.simpleName
        is DeviceInformationChangeError.SigningError -> DeviceInformationChangeError.SigningError::class.java.simpleName
        is DeviceInformationChangeError.NotFound -> DeviceInformationChangeError.NotFound::class.java.simpleName
        else -> UNKNOWN_ERROR
    }
}

private fun InitializationError.type(): String {
    return when (this) {
        is InitializationError.RootedError -> InitializationError.RootedError::class.java.simpleName
        is InitializationError.HardwareError -> InitializationError.HardwareError::class.java.simpleName
        is InitializationError.LockScreenHasChangedError -> InitializationError.LockScreenHasChangedError::class.java.simpleName
        is InitializationError.NoDeviceLockError -> InitializationError.NoDeviceLockError::class.java.simpleName
        is InitializationError.DeviceProtectionError -> InitializationError.DeviceProtectionError::class.java.simpleName
        else -> UNKNOWN_ERROR
    }
}

private fun OperationError.type(): String {
    return when (this) {
        is OperationError.NoDeviceLockError -> OperationError.NoDeviceLockError::class.java.simpleName
        is OperationError.DeviceProtectionError -> OperationError.DeviceProtectionError::class.java.simpleName
        is OperationError.NetworkError -> OperationError.NetworkError::class.java.simpleName
        else -> FIDO_ERROR
    }
}

private fun OutOfBandOperationError.type(): String {
    return when (this) {
        is OutOfBandOperationError.NoDeviceLockError -> OutOfBandOperationError.NoDeviceLockError::class.java.simpleName
        is OutOfBandOperationError.DeviceProtectionError -> OutOfBandOperationError.DeviceProtectionError::class.java.simpleName
        is OutOfBandOperationError.NetworkError -> OutOfBandOperationError.NetworkError::class.java.simpleName
        is OutOfBandOperationError.TokenExpired -> OutOfBandOperationError.TokenExpired::class.java.simpleName
        is OutOfBandOperationError.TokenAlreadyRedeemed -> OutOfBandOperationError.TokenAlreadyRedeemed::class.java.simpleName
        else -> UNKNOWN_ERROR
    }
}

private fun OutOfBandPayloadError.type(): String {
    return when (this) {
        is OutOfBandPayloadError.NoDeviceLockError -> OutOfBandPayloadError.NoDeviceLockError::class.java.simpleName
        is OutOfBandPayloadError.DeviceProtectionError -> OutOfBandPayloadError.DeviceProtectionError::class.java.simpleName
        is OutOfBandPayloadError.DecryptionError -> OutOfBandPayloadError.DecryptionError::class.java.simpleName
        is OutOfBandPayloadError.MalformedPayload -> OutOfBandPayloadError.MalformedPayload::class.java.simpleName
        else -> UNKNOWN_ERROR
    }
}

private fun PinChangeError.type(): String {
    return when (this) {
        is PinChangeError.NoDeviceLockError -> PinChangeError.NoDeviceLockError::class.java.simpleName
        is PinChangeError.DeviceProtectionError -> PinChangeError.DeviceProtectionError::class.java.simpleName
        is PinChangeError.PinLocked -> PinChangeError.PinLocked::class.java.simpleName
        is PinChangeError.UserCanceled -> PinChangeError.UserCanceled::class.java.simpleName
        is PinChangeError.PinNotEnrolled -> PinChangeError.PinNotEnrolled::class.java.simpleName
        else -> UNKNOWN_ERROR
    }
}

private fun AuthCloudApiError.type(): String {
    return when (this) {
        is AuthCloudApiError.OperationError -> FIDO_ERROR
        is AuthCloudApiError.NoDeviceLockError -> AuthCloudApiError.NoDeviceLockError::class.java.simpleName
        is AuthCloudApiError.DeviceProtectionError -> AuthCloudApiError.DeviceProtectionError::class.java.simpleName
        is AuthCloudApiError.NetworkError -> AuthCloudApiError.NetworkError::class.java.simpleName
        is AuthCloudApiError.TokenExpired -> AuthCloudApiError.TokenExpired::class.java.simpleName
        is AuthCloudApiError.TokenAlreadyRedeemed -> AuthCloudApiError.TokenAlreadyRedeemed::class.java.simpleName
        is AuthCloudApiError.DecryptionError -> AuthCloudApiError.DecryptionError::class.java.simpleName
        is AuthCloudApiError.MalformedResponse -> MALFORMED_PAYLOAD_ERROR
        else -> UNKNOWN_ERROR
    }
}
